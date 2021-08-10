import { gql } from 'apollo-server-express'

const types = gql`
	extend type Query {
		getMultipleUserNameImage(Input: MultipleUserIDs!): [UserNameImage!]
		getMyAddress: Address!
		getMultipleProfile(Input: MultipleUserIDs!): [UserProfile!]
	}

	extend type Mutation {
		updateProfile(Input: UpdateProfileInput!): SuccessResponse!
		uploadProfilePicture(image: String!): SuccessResponse!
		removeProfilePicture: SuccessResponse!
	}

	type UserProfile {
		name: String!
		profilePicture: String!
		address: Address!
	}

	type UserNameImage {
		name: String!
		profilePicture: String!
	}

	input UpdateProfileInput {
		name: String!
		address: AddressInput!
	}

	input AddressInput {
		country: String!
		city: String!
		postal: String!
		address: String!
	}

	type Address {
		country: String!
		city: String!
		postal: String!
		address: String!
	}
`

export default types
