import { rule } from 'graphql-shield'

import Product from 'models/Product'
import Cart from 'models/Cart'

import { modifyTypes } from 'graphql/Cart/modifyQuantity.mutation'

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

const canProductBeAddedToCart = rule()(
	async (_, { Input: { productID, quantity } }, { user: { id } }) => {
		try {
			const product = await Product.findById(productID, 'quantity')

			if (!product) return sendShieldError('No product found')

			const userCart = await Cart.findOne(
				{ user: id },
				{
					products: {
						$elemMatch: { id: { $eq: productID } },
					},
				}
			)

			if (userCart.products.length) return sendShieldError('Product already exist')

			if (quantity > product.quantity)
				return sendShieldError('Not enough product exist on stock')

			return true
		} catch (__) {
			return somethingWentWrong()
		}
	}
)

const canProductQuantityBeModified = rule()(
	async (_, { Input: { productID, amount, type } }, { user: { id } }) => {
		try {
			const { DECREASE, INCREASE } = modifyTypes

			if (!(type === DECREASE || type === INCREASE))
				return sendShieldError('operation type is incorrect')

			const product = await Product.findById(productID, 'quantity')

			if (!product) return sendShieldError('No product found')

			const productQuantity = product.quantity

			if (type === INCREASE && amount > productQuantity)
				return sendShieldError('Not enough product exist on stock')

			const userCart = await Cart.findOne(
				{ user: id },
				{
					products: {
						$elemMatch: { id: { $eq: productID } },
					},
				}
			)

			if (!userCart.products.length)
				return sendShieldError('Product does not exist on cart')

			return true
		} catch (__) {
			return somethingWentWrong()
		}
	}
)

export {
	canProductBeAddedToCart,
	doesProductExist,
	canProductQuantityBeModified,
}
