import jwt from 'jsonwebtoken'
import { hash } from 'bcryptjs'

import sendErrorMessage from 'utils/errorMessage'

import validateRegisterInput from 'validation/register'

import User from 'models/User'
import Profile from 'models/Profile'
import Cart from 'models/Cart'

const createUser = async ({ name, email, password }) => {
	try {
		const hashedPassword = await hash(password, 10)

		const profile = new Profile({ name })

		const userModelData = {
			email,
			password: hashedPassword,
			profile: profile._id,
		}

		const newUser = new User(userModelData)

		const newUserID = newUser._id

		const cart = new Cart({ user: newUserID })

		profile.user = newUserID

		profile.save()
		cart.save()

		return newUser.save()
	} catch (error) {
		return sendErrorMessage(error)
	}
}

export const validationErrorMessage = errors => ({
	validationError: errors,
})

const resolver = {
	Mutation: {
		register: async (_, { Input }) => {
			const { errors, isValid } = validateRegisterInput(Input)

			const { email, name, password } = Input

			if (!isValid) {
				return validationErrorMessage(errors)
			}

			try {
				const user = await User.findOne({ email })

				if (user) {
					return sendErrorMessage('User already exist')
				}

				const newUser = await createUser({ name, email, password })

				if (!newUser || newUser.errorMessage) {
					return sendErrorMessage('Registering user failed. Please try again later.')
				}

				const { _id, profile } = newUser

				const token = jwt.sign(
					{ userID: _id, profileID: profile },
					process.env.SECRET_KEY,
					{
						expiresIn: '7d',
					}
				)

				return { token: `Bearer ${token}` }
			} catch (error) {
				return sendErrorMessage(error)
			}
		},
	},
}

export default resolver
