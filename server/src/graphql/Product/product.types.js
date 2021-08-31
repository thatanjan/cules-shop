import { gql } from 'apollo-server-express'

const typeDefs = gql`
	extend type Mutation {
		createProduct(Input: CreateProductInput!): CreateProductResponse!
		addReview(Input: AddReviewInput!): SuccessResponse!
	}

	extend type Query {
		getCategoryProducts(
			Input: GetCategoryProductsInput!
		): GetCategoryProductsResponse!
		getProducts(Input: GetProductInput!): [Product!]!
		getProductDetails(productID: ID!): ProductDetails!
		getAllCategoryNames: [AllCategoryNames!]
		searchProducts(Input: SearchProductsInput!): GetCategoryProductsResponse!
		getReviews(productID: ID!): GetReviewsResponse!
		getAllSellerProducts: GetAllSellerProductsResponse!
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

	type GetAllSellerProductsResponse {
		products: [SellerProduct!]
		errorMessage: String
	}

	type SellerProduct {
		_id: String!
		name: String!
		category: CategoryName!
		price: Int!
		image: String!
	}

	type ReviewUser {
		name: String!
		profilePicture: String!
		user: ID!
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
		totalProducts: Int
		products: [Product!]
		errorMessage: String
	}

	type Reviews {
		_id: ID!
		description: String!
		user: ReviewUser!
		star: Int!
		date: String!
	}

	type GetReviewsResponse {
		totalReviews: Int!
		averageStars: Int!
		reviews: [Reviews!]
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

	input AddReviewInput {
		description: String!
		star: Int!
		productID: ID!
	}
`

export default typeDefs
