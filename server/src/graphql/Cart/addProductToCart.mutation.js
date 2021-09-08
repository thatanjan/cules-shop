import Cart from 'models/Cart'
import sendErrorMessage from 'utils/errorMessage'

const resolvers = {
	Mutation: {
		addProductToCart: async (
			_,
			{ Input: { productID, quantity } },
			{ user: { userID } }
		) => {
			try {
				const addProduct = await Cart.updateOne(
					{ user: userID },
					{
						$push: { products: { productID, quantity } },
						$inc: { totalQuantity: quantity },
					}
				)

				if (!addProduct) {
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
