import { gql } from 'graphql-request'

export const getAllCategoryNames = gql`
	query getAllCategoryNames {
		getAllCategoryNames {
			name
			categoryID
		}
	}
`

export const getProductDetails = gql`
	query getProductDetails($productID: ID!) {
		getProductDetails(productID: $productID) {
			name
			description
			category
			seller
			price
			quantity
			image
		}
	}
`
