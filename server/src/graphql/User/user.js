import merge from 'lodash/merge'

import typeDefs from './user.types'

import registerUserMutation from './register.mutation'

const resolver = {
	Query: {
		hello: () => 'hello world',
	},
}

export const userTypeDefs = [typeDefs]

export const userResolvers = merge(registerUserMutation, resolver)
