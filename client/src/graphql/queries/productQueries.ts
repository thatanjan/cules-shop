import { gql } from 'graphql-request'

export const getAllCategoryNames = gql`
	query getAllCategoryNames {
		getAllCategoryNames {
			categories {
				image
				name
				_id
			}
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
			totalProducts
			products {
				_id
				name
				price
				image
				quantity
				category {
					name
					_id
				}
				alreadyInCart
			}
			errorMessage
		}
	}
`

export const searchProducts = gql`
	query searchProducts($query: String!, $skip: Int!, $sortBy: String!) {
		searchProducts(Input: { query: $query, skip: $skip, sortBy: $sortBy }) {
			totalProducts
			products {
				_id
				name
				price
				image
				category {
					name
					_id
				}
				alreadyInCart
				quantity
			}
			errorMessage
		}
	}
`

export const getReviews = gql`
	query getReviews($productID: ID!) {
		getReviews(productID: $productID) {
			totalReviews
			averageStars
			reviews {
				_id
				description
				user {
					user
					name
					profilePicture
				}
				star
				date
			}
		}
	}
`

export const getAllSellerProducts = gql`
	query getAllSellerProducts {
		getAllSellerProducts {
			products {
				name
				category {
					name
					_id
				}
				image
				price
				_id
			}
			errorMessage
		}
	}
`
