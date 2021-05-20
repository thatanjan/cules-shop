import Cart from 'models/Cart'
import sendErrorMessage from 'utils/errorMessage'

const resolvers = {
	Mutation: {
		addProductToCart: async (_, { Input }, { user: { id } }) => {
			try {
				const addProduct = await Cart.updateOne(
					{ user: id },
					{
						$push: { products: Input },
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