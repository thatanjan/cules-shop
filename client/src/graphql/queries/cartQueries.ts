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
