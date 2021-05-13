import { gql } from 'apollo-server-express'

const typeDefs = gql`
	extend type Mutation {
		addProductToCart(Input: AddProductToCartInput): Success!
	}

	input AddProductToCartInput {
		productID: ID!
		quantity: Int!
	}
`

export default typeDefs
