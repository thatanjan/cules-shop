import { gql } from 'apollo-server-express'

const types = gql`
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
`

export default types
