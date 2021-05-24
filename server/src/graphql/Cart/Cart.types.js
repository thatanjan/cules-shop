import { gql } from 'apollo-server-express'

const typeDefs = gql`
	extend type Mutation {
		addProductToCart(Input: AddProductToCartInput!): SuccessResponse!
		modifyQuantity(Input: ModifyQuantityInput!): SuccessResponse!
		removeProductFromCart(Input: RemoveProductFromCartInput): SuccessResponse!
	}

	input AddProductToCartInput {
		productID: ID!
		quantity: Int!
	}

	input RemoveProductFromCartInput {
		productID: ID!
	}

	input ModifyQuantityInput {
		productID: ID!
		type: String!
		amount: Int!
	}
`

export default typeDefs
