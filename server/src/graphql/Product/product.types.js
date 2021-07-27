import { gql } from 'apollo-server-express'

const typeDefs = gql`
	extend type Mutation {
		createProduct(Input: CreateProductInput!): CreateProductResponse!
	}

	extend type Query {
		getCategoryProducts(
			Input: GetCategoryProductsInput!
		): GetCategoryProductsResponse!
		getProducts(Input: GetProductInput!): [Product!]!
		getProductDetails(productID: ID!): ProductDetails!
		getAllCategoryNames: [AllCategoryNames!]
		searchProducts(Input: SearchProductsInput!): GetCategoryProductsResponse!
	}

	type AllCategoryNames {
		name: String!
		categoryID: ID!
	}

	type SellerName {
		company: String!
		_id: String!
	}

	"""
	CategoryName  has come from car.types.js file
	"""
	type Product {
		_id: String!
		name: String!
		category: CategoryName!
		price: Int!
		image: String!
		alreadyInCart: Boolean
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

	type GetCategoryProductsResponse {
		totalProducts: Int!
		products: [Product!]
		errorMessage: String
	}

	input GetProductInput {
		products: [ID!]!
	}

	input SearchProductsInput {
		query: String!
		skip: Int!
		sortBy: String!
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

	input GetCategoryProductsInput {
		skip: Int!
		categoryID: ID!
		sortBy: String!
	}

	type CreateProductResponse {
		success: String
		errorMessage: String
		productID: ID
	}
`

export default typeDefs
