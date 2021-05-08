import { gql } from 'apollo-server-express'

import { userTypeDefs } from 'graphql/User/user'

const Query = gql`
	type Query {
		_empty: String
		hello: String
	}
`

const Mutation = gql`
	type Mutation {
		_empty: String
	}
`

const typeDefs = [Query, Mutation, ...userTypeDefs]

export default typeDefs
