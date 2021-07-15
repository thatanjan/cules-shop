import { gql } from 'graphql-request'

export const uploadProfilePicture = gql`
	mutation uploadProfilePicture($image: String!) {
		uploadProfilePicture(image: $image) {
			errorMessage
			message
		}
	}
`
