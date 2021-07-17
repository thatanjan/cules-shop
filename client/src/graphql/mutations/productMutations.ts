import { gql } from 'graphql-request'

export const createProduct = gql`
	mutation createProduct(
		$name: String!
		$shortDescription: String!
		$description: String!
		$quantity: Int!
		$category: ID!
	) {
		createProduct(
			Input: {
				name: $name
				shortDescription: $shortDescription
				description: $description
				quantity: $quantity
				category: $category
			}
		) {
			success
			errorMessage
		}
	}
`
