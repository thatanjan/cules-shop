import { gql } from 'apollo-server-express'

const typeDefs = gql`
	extend type Mutation {
		createProduct(Input: CreateProductInput!): SuccessResponse!
	}

	extend type Query {
		getProducts(Input: GetProductInput!): [Product!]!
		getProductDetails(productID: ID!): ProductDetails!
	}

	type Product {
		name: String!
		shortDescription: String!
		category: String!
		seller: String!
	}

	type ProductDetails {
		name: String!
		description: String!
		category: String!
		seller: String!
		price: Int!
		quantity: Int!
	}

	input GetProductInput {
		products: [ID!]!
	}

	input CreateProductInput {
		name: String!
		shortDescription: String!
		description: String!
		quantity: Int!
		category: ID!
	}
`

export default typeDefs
