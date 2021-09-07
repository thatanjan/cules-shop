import { gql } from 'graphql-request'

export const totalCartItems = gql`
	query totalCartItems {
		totalCartItems {
			totalItems
			errorMessage
		}
	}
`

export const totalCartPrice = gql`
	query totalCartPrice {
		totalCartPrice {
			totalPrice
			errorMessage
		}
	}
`

export const getAllCartProducts = gql`
	query getAllCartProducts {
		getAllCartProducts {
			cartProducts {
				name
				image
				price
				_id
				userQuantity
				quantity
				category {
					name
					_id
				}
			}
			errorMessage
		}
	}
`
