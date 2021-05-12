import { and, rule, shield } from 'graphql-shield'

import Seller from 'models/Seller'

const isSeller = rule()(async (_, __, { user: { id } }) => {
	try {
		const result = await Seller.findOne({ user: id })

		if (result) return new Error('Sorry, You are already a Seller')

		return true
	} catch (___) {
		return new Error('Sorry something went wrong')
	}
})

export default shield({
	Mutation: {
		becomeSeller: and(isSeller),
	},
})
