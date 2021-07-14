import { gql } from 'apollo-server-express'

const types = gql`
	extend type Query {
		getMultipleUserNameImage(Input: MultipleUserIDs): [UserNameImage!]
		getMyAddress: Address!
	}

	extend type Mutation {
		updateMyAddress(Input: AddressInput): SuccessResponse!
	}

	type UserNameImage {
		name: String!
		image: String!
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
