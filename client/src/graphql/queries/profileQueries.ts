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

export const getMultipleUserNameImage = gql`
	query getMultipleUserNameImage($userIDs: [ID!]!) {
		getMultipleUserNameImage(Input: { userIDs: $userIDs }) {
			name
			image
		}
	}
`

export const getMultipleProfile = gql`
	query getMultipleProfile($userIDs: [ID!]!) {
		getMultipleProfile(Input: { userIDs: $userIDs }) {
			name
			profilePicture
			address {
				country
				city
				postal
				address
			}
		}
	}
`
