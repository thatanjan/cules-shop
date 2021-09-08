import { gql } from 'graphql-request'

export const uploadProfilePicture = gql`
	mutation uploadProfilePicture($image: String!) {
		uploadProfilePicture(image: $image) {
			success
			errorMessage
		}
	}
`

export const updateProfile = gql`
	query updateProfile(
		$name: String!
		$country: String!
		$city: String!
		$postal: String!
		$address: String!
	) {
		getMultipleUserNameImage(
			Input: {
				name: $name
				address: {
					country: $country
					city: $city
					postal: $postal
					address: $address
				}
			}
		) {
			success
			errorMessage
		}
	}
`
