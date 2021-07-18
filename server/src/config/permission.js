import { and, rule, shield } from 'graphql-shield'

import Seller from 'models/Seller'
import User from 'models/User'

import { somethingWentWrong, sendShieldError } from 'utils/shieldError'

import {
	canProductBeAddedToCart,
	canProductQuantityBeModified,
} from './cartPermissions'

const isSeller = rule()(async (_, __, { user: { userID } }) => {
	try {
		const result = await Seller.findOne({ user: userID })

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

	const { userID } = user

	const doesUserExist = await User.findById(userID)

	if (!doesUserExist) return false

	return true
})

export default shield(
	{
		Mutation: {
			becomeSeller: and(isSeller),
			addProductToCart: and(isAuthenticated, canProductBeAddedToCart),
			modifyQuantity: and(isAuthenticated, canProductQuantityBeModified),
			removeProductFromCart: and(isAuthenticated),
		},
		Query: {
			isProductInTheCart: and(isAuthenticated),
		},
	},
	{
		allowExternalErrors: true,
	}
)
