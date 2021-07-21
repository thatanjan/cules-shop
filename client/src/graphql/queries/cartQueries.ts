import { gql } from 'graphql-request'

export const totalCartItems = gql`
	query totalCartItems {
		totalCartItems {
			totalItems
			errorMessage
		}
	}
`
