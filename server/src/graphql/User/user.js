import merge from 'lodash/merge'

import typeDefs from './user.types'

import registerUserMutation from './register.mutation'
import loginUserMutation from './login.mutation'
import becomeSellerMutation from './becomeSeller.mutation'
import getMultipleUserNameImage from './getMultipleUserNameImage.query'

const resolver = {
	Query: {
		hello: () => 'hello world',
	},
}

export const userTypeDefs = [typeDefs]

export const userResolvers = merge(
	registerUserMutation,
	loginUserMutation,
	resolver,
	becomeSellerMutation,
	getMultipleUserNameImage
)
