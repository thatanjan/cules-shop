import jwt from 'jsonwebtoken'
import { compare } from 'bcryptjs'

import sendErrorMessage from 'utils/errorMessage'
import validateLoginInput from 'validation/login'
import User from 'models/User'

export const validationErrorMessage = errors => ({
	validationError: errors,
})

const resolver = {
	Mutation: {
		login: async (_, { Input }) => {
			const { errors, isValid } = validateLoginInput(Input)

			const { email, password } = Input

			if (!isValid) {
				console.log(isValid)
				return validationErrorMessage(errors)
			}

			try {
				const user = await User.findOne({ email })

				if (!user) {
					return sendErrorMessage("User doesn't exist")
				}

				const passwordsMatched = await compare(password, user.password)

				if (!passwordsMatched) return sendErrorMessage("passwords doesn't match")

				const { _id } = user

				const token = jwt.sign({ id: _id }, process.env.SECRET_KEY, {
					expiresIn: '7d',
				})

				return { token: `Bearer ${token}` }
			} catch (error) {
				return sendErrorMessage(error)
			}
		},
	},
}

export default resolver
