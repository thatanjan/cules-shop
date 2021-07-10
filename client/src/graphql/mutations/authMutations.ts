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
