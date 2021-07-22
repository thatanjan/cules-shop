import { gql } from 'apollo-server-express'

const typeDefs = gql`
	extend type Mutation {
		createProduct(Input: CreateProductInput!): CreateProductResponse!
	}

	extend type Query {
		getProducts(Input: GetProductInput!): [Product!]!
		getProductDetails(productID: ID!): ProductDetails!
		getAllCategoryNames: [AllCategoryNames!]
	}

	type AllCategoryNames {
		name: String!
		categoryID: ID!
	}

	"""
	CategoryName  has come from car.types.js file
	"""
	type Product {
		name: String!
		shortDescription: String!
		category: CategoryName!
		seller: String!
	}

	type ProductDetails {
		name: String!
		description: String!
		category: CategoryName!
		seller: String!
		price: Int!
		quantity: Int!
		image: String!
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
		price: Int!
		image: String!
	}

	type CreateProductResponse {
		success: String
		errorMessage: String
		productID: ID
	}
`

export default typeDefs
