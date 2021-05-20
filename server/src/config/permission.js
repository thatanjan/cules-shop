import { and, rule, shield } from 'graphql-shield'

import Seller from 'models/Seller'
import Product from 'models/Product'

const isSeller = rule()(async (_, __, { user: { id } }) => {
	try {
		const result = await Seller.findOne({ user: id })

		if (result) return new Error('Sorry, You are already a Seller')

		return true
	} catch (___) {
		return new Error('Sorry something went wrong')
	}
})

const doesProductExist = rule()(async (_, { Input: { ProductID } }) => {
	try {
		const product = await Product.findById(ProductID, 'name')

		if (!product) return new Error('No product found')

		return true
	} catch (__) {
		return new Error('Sorry something went wrong')
	}
})

export default shield({
	Mutation: {
		becomeSeller: and(isSeller),
	},
})
