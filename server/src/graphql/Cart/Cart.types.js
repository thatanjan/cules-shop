import { gql } from 'apollo-server-express'

const typeDefs = gql`
	extend type Mutation {
		addProductToCart(Input: AddProductToCartInput!): SuccessResponse!
		modifyQuantity(Input: ModifyQuantityInput!): SuccessResponse!
		removeProductFromCart(Input: RemoveProductFromCartInput): SuccessResponse!
	}

	extend type Query {
		isProductInTheCart(productID: ID!): Exist!
		totalCartItems: TotalCartItems!
		totalCartPrice: TotalCartPrice!
	}

	type Exist {
		exist: Boolean
		errorMessage: String
		quantity: Int
	}

	type TotalCartPrice {
		totalPrice: Int
		errorMessage: String
	}

	type TotalCartItems {
		totalItems: Int
		errorMessage: String
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
