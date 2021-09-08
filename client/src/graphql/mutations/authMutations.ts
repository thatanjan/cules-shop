import { gql } from 'graphql-request'

export const loginMutation = gql`
	mutation login($email: String!, $password: String!) {
		login(Input: { email: $email, password: $password }) {
			token
			errorMessage
			validationError {
				email
				password
			}
		}
	}
`

export const registerMutation = gql`
	mutation register(
		$name: String!
		$email: String!
		$password: String!
		$confirmPassword: String!
	) {
		register(
			Input: {
				name: $name
				email: $email
				password: $password
				confirmPassword: $confirmPassword
			}
		) {
			token
			errorMessage
			validationError {
				email
				password
			}
		}
	}
`
