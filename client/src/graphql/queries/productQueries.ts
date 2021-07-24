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
			category {
				name
				_id
			}
			seller
			price
			quantity
			image
		}
	}
`

export const isProductInTheCart = gql`
	query isProductInTheCart($productID: ID!) {
		isProductInTheCart(productID: $productID) {
			exist
			errorMessage
			quantity
		}
	}
`

export const getCategoryProducts = gql`
	query getCategoryProducts($categoryID: ID!, $sortBy: String!, $skip: Int!) {
		getCategoryProducts(
			Input: { categoryID: $categoryID, sortBy: $sortBy, skip: $skip }
		) {
			products {
				_id
				name
				price
				category {
					name
					_id
				}
			}
			errorMessage
		}
	}
`
