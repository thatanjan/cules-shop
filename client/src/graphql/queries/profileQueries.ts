import { gql } from 'graphql-request'

export const getMyAddress = gql`
	query getMyAddress {
		getMyAddress {
			country
			city
			postal
			address
		}
	}
`
