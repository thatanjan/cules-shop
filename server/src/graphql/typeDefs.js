import { gql } from 'apollo-server-express'

import { userTypeDefs } from 'graphql/User/user'

const typeDefs = gql`
	type Query {
		_empty: String
		hello: String
	}

	type Mutation {
		_empty: String
	}

	type SuccessResponse {
		success: Boolean
		errorMessage: String
	}
`

export default [typeDefs, ...userTypeDefs]
