import { and, rule, shield } from 'graphql-shield'

import Seller from 'models/Seller'

import { somethingWentWrong, sendShieldError } from 'utils/shieldError'

import { canProductBeAddedToCart } from './productPermissions'

const isSeller = rule()(async (_, __, { user: { id } }) => {
	try {
		const result = await Seller.findOne({ user: id })

		if (result) return sendShieldError('Sorry, You are already a Seller')

		return true
	} catch (___) {
		return somethingWentWrong()
	}
})

const isAuthenticated = rule()(async (_, __, { user, error }) => {
	if (error) {
		return new Error(error)
	}

	if (!user) {
		return false
	}

	return true
})

export default shield(
	{
		Mutation: {
			becomeSeller: and(isSeller),
			addProductToCart: and(isAuthenticated, canProductBeAddedToCart),
		},
	},
	{
		allowExternalErrors: true,
	}
)
