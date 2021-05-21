import { rule } from 'graphql-shield'

import Product from 'models/Product'
import Cart from 'models/Cart'

import somethingWentWrong from 'utils/shieldError'

const doesProductExist = rule()(async (_, { Input: { productID } }) => {
	try {
		const product = await Product.findById(productID, 'name')

		if (!product) return new Error('No product found')

		return true
	} catch (__) {
		return somethingWentWrong()
	}
})

const canProductBeAddedToCart = rule()(
	async (_, { Input: { productID, quantity } }, { user: { id } }) => {
		try {
			const product = await Product.findById(productID, 'quantity')

			if (!product) return new Error('No product found')

			const userCart = await Cart.findOne(
				{ user: id },
				{
					products: {
						$elemMatch: { id: { $eq: productID } },
					},
				}
			)

			if (userCart.products.length) return new Error('Product already exist')

			if (quantity > product.quantity)
				return new Error('Not enough product exist on stock')

			return true
		} catch (__) {
			return somethingWentWrong()
		}
	}
)

export { canProductBeAddedToCart, doesProductExist }
