import { gql } from 'graphql-request'

export const getAllCategoryNames = gql`
	query getAllCategoryNames {
		name
		categoryID
	}
`
