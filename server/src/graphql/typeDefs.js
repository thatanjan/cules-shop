import { gql } from 'apollo-server-express'

import { userTypeDefs } from 'graphql/User/user'
import { productTypeDefs } from 'graphql/Product/product'
import { cartTypeDefs } from 'graphql/Cart/cart'
import { profileTypeDefs } from 'graphql/Profile/profile'

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

	input MultipleUserIDs {
		userIDs: [ID!]!
	}
`

export default [
	typeDefs,
	...userTypeDefs,
	...productTypeDefs,
	...cartTypeDefs,
	...profileTypeDefs,
]
