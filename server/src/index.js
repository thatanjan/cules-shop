import mongoose from 'mongoose'
import cloudinary from 'cloudinary'
import express from 'express'
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express'
import dotenv from 'dotenv'
import { applyMiddleware } from 'graphql-middleware'
import expressJwt from 'express-jwt'
import jwt from 'jsonwebtoken'

import typeDefs from 'graphql/typeDefs'
import resolvers from 'graphql/resolvers'

import Product from 'models/Product'
import Category from 'models/Category'
import User from 'models/User'
import Seller from 'models/Seller'

import permissions from 'config/permission'

dotenv.config()

const cloudinaryV2 = cloudinary.v2

cloudinaryV2.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
})

const app = express()

app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

mongoose
	.connect(process.env.USERS_DB_URI, {
		useNewUrlParser: true,
		useFindAndModify: false,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => {
		console.log('mongodb connected')
	})
	.catch(error => {
		// eslint-disable-next-line
		console.log(error)
	})

app.use(
	expressJwt({
		secret: process.env.SECRET_KEY,
		algorithms: ['HS256'],
		credentialsRequired: false,
	})
)

app.use((err, req, _, next) => {
	if (err.name === 'UnauthorizedError') {
		req.UnauthorizedError = err.message
	}

	next()
})

const removeBearer = token => {
	const parts = token.split(' ')
	if (parts.length === 2) {
		const scheme = parts[0]
		const credentials = parts[1]

		if (/^Bearer$/i.test(scheme)) {
			const newToken = credentials

			return newToken
		}
	}

	return token
}

app.post('/validate', ({ body }, res) => {
	const {
		data: { jwt: token },
	} = body

	if (!token) return res.status(401).send('No token found')

	const newToken = removeBearer(token)

	jwt.verify(newToken, process.env.SECRET_KEY, async (err, decoded) => {
		if (err) return res.status(401).send(err)

		const { userID } = decoded

		const user = await User.findById(userID)

		if (!user) return res.status(401).send("User doesn't exist")
	})
})

app.get('/doesProductExist', async ({ body }, res) => {
	try {
		const { productID } = body

		if (!productID) return res.status(401).send('No product id found')

		const product = await Product.findById(productID, '_id')

		if (!product) return res.status(401).send("product doesn't exist")

		return res.status(200).send('product found')
	} catch (e) {
		return res.status(401).send('something went wrong')
	}
})

app.get('/doesCategoryExist', async ({ body }, res) => {
	try {
		const { categoryID } = body

		if (!categoryID) return res.status(401).send('No Category id found')

		const category = await Category.findById(categoryID, 'name')

		if (!category) return res.status(401).send("Category doesn't exist")

		return res.status(200).json({ name: category.name })
	} catch (e) {
		return res.status(401).send('something went wrong')
	}
})

const server = new ApolloServer({
	schema: applyMiddleware(
		makeExecutableSchema({
			typeDefs,
			resolvers,
		}),
		permissions
	),
	context: ctx => {
		const {
			req: { user, UnauthorizedError },
		} = ctx

		if (user) {
			return { ...ctx, user }
		}

		if (UnauthorizedError) {
			return { error: UnauthorizedError }
		}

		return ctx
	},
})

server.applyMiddleware({ app })

const port = process.env.PORT || 8000

app.listen({ port }, () => console.log(`server is running at ${port}`))
