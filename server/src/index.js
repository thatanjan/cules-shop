import mongoose from 'mongoose'
import express from 'express'
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express'
import dotenv from 'dotenv'
import { applyMiddleware } from 'graphql-middleware'
import jwt from 'express-jwt'

import typeDefs from 'graphql/typeDefs'
import resolvers from 'graphql/resolvers'

import permissions from 'config/permission'

dotenv.config()

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
	jwt({
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

app.get('/validate', ({ body }, res) => {
	const {
		data: { jwt: token },
	} = body

	if (!token) res.status(401).send('No token found')

	const newToken = removeBearer(token)

	jwtToken.verify(newToken, process.env.SECRET_KEY, err => {
		if (err) res.status(401).send(err)

		res.status(200).send('calm down')
	})
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
