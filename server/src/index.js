import mongoose from 'mongoose'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import dotenv from 'dotenv'
import jwt from 'express-jwt'

import typeDefs from 'graphql/typeDefs'
import resolvers from 'graphql/resolvers'

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

const server = new ApolloServer({
	typeDefs,
	resolvers,
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

const port = process.env.PORT || 9000

app.listen({ port }, () => console.log(`server is running at ${port}`))
