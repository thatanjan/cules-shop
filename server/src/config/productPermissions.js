import { rule } from 'graphql-shield'

import Product from 'models/Product'

import { somethingWentWrong, sendShieldError } from 'utils/shieldError'

const doesProductExist = rule()(async (_, { Input: { productID } }) => {
	try {
		const product = await Product.findById(productID, 'name')

		if (!product) return sendShieldError('No product found')

		return true
	} catch (__) {
		return somethingWentWrong()
	}
})

export { doesProductExist }
