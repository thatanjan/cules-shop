import Cart from 'models/Cart'
import sendErrorMessage from 'utils/errorMessage'

const resolver = {
	Query: {
		isProductInTheCart: async (_, { productID }, { user: { userID } }) => {
			try {
				const userCart = await Cart.findOne(
					{ user: userID },
					{
						products: {
							$elemMatch: { id: { $eq: productID } },
						},
					}
				)

				if (userCart.products.length) return { exist: true }

				return { exist: false }
			} catch (__) {
				return sendErrorMessage()
			}
		},
	},
}

export default resolver
