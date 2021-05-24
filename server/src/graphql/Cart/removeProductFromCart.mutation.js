import Cart from 'models/Cart'
import sendErrorMessage from 'utils/errorMessage'

const resolvers = {
	Mutation: {
		removeProductFromCart: async (
			_,
			{ Input: { productID } },
			{ user: { id } }
		) => {
			try {
				const removeProduct = await Cart.findOneAndUpdate(
					{ user: id },
					{
						$pull: { products: { id: productID } },
					},
					{
						projection: {
							products: {
								$elemMatch: { id: { $eq: productID } },
							},
						},
					}
				)

				if (!removeProduct) {
					return sendErrorMessage()
				}

				const reduceTotalQuantity = await Cart.updateOne(
					{ user: id },
					{
						$inc: {
							totalQuantity: removeProduct.products[0].quantity * -1,
						},
					}
				)

				if (!reduceTotalQuantity || !reduceTotalQuantity.nModified) {
					return sendErrorMessage()
				}

				return { success: true }
			} catch (__) {
				return sendErrorMessage()
			}
		},
	},
}

export default resolvers
