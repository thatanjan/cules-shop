import Validator from 'validator'
import isEmpty from 'utils/isEmpty'

const validateLoginInput = data => {
	const theData = data
	const errors = {}

	if (!Validator.isEmail(theData.email)) {
		errors.email = 'invalid email address'
		errors.email[0].toUpperCase()
	}

	if (Validator.isEmpty(theData.email)) {
		errors.email = 'email field is required'
		errors.email[0].toUpperCase()
	}

	if (Validator.isEmpty(theData.password)) {
		errors.password = 'password is required'
		errors.password[0].toUpperCase()
	}

	return {
		errors,
		isValid: isEmpty(errors),
	}
}

export default validateLoginInput
