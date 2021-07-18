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
