import { gql } from 'apollo-server-express'

const types = gql`
	extend type Query {
		getMultipleUserNameImage(Input: MultipleUserIDs): [UserNameImage!]
		getMyAddress: Address!
	}

	type UserNameImage {
		name: String!
		image: String!
	}

	type Address {
		country: String!
		city: String!
		postal: String!
		address: String!
	}
`

export default types
