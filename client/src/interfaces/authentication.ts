export interface Error {
	email?: String
	password?: String
	name?: String
	confirmPassword?: String
}

interface Output {
	token: string
	errorMessage: string | null
	validationError: Error
}

export interface LoginOutput {
	login: Output
}

export interface LoginInput {
	email: string
	password: string
}
