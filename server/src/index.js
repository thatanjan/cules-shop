import mongoose from 'mongoose'
import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import dotenv from 'dotenv'

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

const server = new ApolloServer({ typeDefs, resolvers })

server.applyMiddleware({ app })

const port = process.env.PORT || 9000

app.listen({ port }, () => console.log(`server is running at ${port}`))
