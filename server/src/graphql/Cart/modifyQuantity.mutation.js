import Cart from 'models/Cart'
import Product from 'models/Product'

export const modifyTypes = {
	INCREASE: 'increase',
	DECREASE: 'decrease',
}

const resolver = {
	Mutation: {
		modifyQuantity: async (
			_,
			{ Input: { type, amount, productID } },
			{ user: { id } }
		) => {
			const { DECREASE, INCREASE } = modifyTypes

			const modifyQuantity = await Cart.updateOne(
				{ user: id },
				{
					$inc: {
						totalQuantity: type === INCREASE ? amount : amount * -1,
						'products.$[product].quantity': type === INCREASE ? amount : amount * -1,
					},
				},
				{ arrayFilters: [{ 'product.id': { $eq: productID } }] }
			)

			console.log(modifyQuantity)

			return { success: true }
		},
	},
}

export default resolver
