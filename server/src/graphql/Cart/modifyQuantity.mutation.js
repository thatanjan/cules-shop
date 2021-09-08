import Cart from 'models/Cart'

import sendErrorMessage from 'utils/errorMessage'

export const modifyTypes = {
	INCREASE: 'increase',
	DECREASE: 'decrease',
}

const resolver = {
	Mutation: {
		modifyQuantity: async (
			_,
			{ Input: { type, amount, productID } },
			{ user: { userID } }
		) => {
			let updateAmount = 0

			switch (type) {
				case modifyTypes.DECREASE:
					updateAmount = amount * -1
					break

				default:
					updateAmount = amount
			}

			const modifyQuantity = await Cart.updateOne(
				{ user: userID },
				{
					$inc: {
						totalQuantity: updateAmount,
						'products.$[product].quantity': updateAmount,
					},
				},
				{ arrayFilters: [{ 'product.productID': { $eq: productID } }] }
			)

			if (!modifyQuantity.nModified) return sendErrorMessage()

			return { success: true }
		},
	},
}

export default resolver
