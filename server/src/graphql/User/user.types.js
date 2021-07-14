import { gql } from 'apollo-server-express'

const types = gql`
	extend type Query {
		getMultipleUserNameImage(Input: MultipleUserIDs): [UserNameImage!]
		getMyAddress: Address!
	}

	extend type Mutation {
		login(Input: LoginInput!): Response!
		register(Input: RegisterInput!): Response!
		becomeSeller: SuccessResponse!
	}

	input LoginInput {
		email: String!
		password: String!
	}

	input RegisterInput {
		email: String!
		name: String!
		password: String!
		confirmPassword: String!
	}

	type ValidationErrorMessage {
		email: String
		name: String
		password: String
		confirmPassword: String
	}

	type Response {
		token: String
		errorMessage: String
		validationError: ValidationErrorMessage
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
