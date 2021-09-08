import { gql } from 'graphql-request'

export const createProduct = gql`
	mutation createProduct(
		$name: String!
		$shortDescription: String!
		$description: String!
		$quantity: Int!
		$price: Int!
		$category: ID!
		$image: String!
	) {
		createProduct(
			Input: {
				name: $name
				shortDescription: $shortDescription
				description: $description
				quantity: $quantity
				category: $category
				price: $price
				image: $image
			}
		) {
			success
			errorMessage
			productID
		}
	}
`

export const removeProductFromCart = gql`
	mutation removeProductFromCart($productID: ID!) {
		removeProductFromCart(Input: { productID: $productID }) {
			success
			errorMessage
		}
	}
`

export const addProductToCart = gql`
	mutation addProductToCart($productID: ID!, $quantity: Int!) {
		addProductToCart(Input: { productID: $productID, quantity: $quantity }) {
			success
			errorMessage
		}
	}
`

export const modifyQuantity = gql`
	mutation modifyQuantity($productID: ID!, $type: String!, $amount: Int!) {
		modifyQuantity(
			Input: { productID: $productID, type: $type, amount: $amount }
		) {
			success
			errorMessage
		}
	}
`

export const addReview = gql`
	mutation addReview($productID: ID!, $description: String!, $star: Int!) {
		addReview(
			Input: { productID: $productID, description: $description, star: $star }
		) {
			success
			errorMessage
		}
	}
`
