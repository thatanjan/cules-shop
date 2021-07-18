import Cart from 'models/Cart'
import sendErrorMessage from 'utils/errorMessage'

const resolvers = {
	Mutation: {
		removeProductFromCart: async (
			_,
			{ Input: { productID } },
			{ user: { userID } }
		) => {
			try {
				const removeProduct = await Cart.findOneAndUpdate(
					{ user: userID },
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
					{ user: userID },
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
