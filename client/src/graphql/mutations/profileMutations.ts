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
	mutation updateProfile(
		$name: String!
		$country: String!
		$city: String!
		$postal: String!
		$address: String!
	) {
		updateProfile(
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

export const becomeSeller = gql`
	mutation becomeSeller($company: String!) {
		becomeSeller(Input: { company: $company }) {
			success
			errorMessage
		}
	}
`
