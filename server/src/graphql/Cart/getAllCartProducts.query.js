import Cart from 'models/Cart'
import sendErrorMessage from 'utils/errorMessage'

const resolver = {
	Query: {
		getAllCartProducts: async (_, __, { user: { userID } }) => {
			try {
				const { products } = await Cart.findOne(
					{ user: userID },
					'products.productID products.quantity'
				).populate({
					path: 'products.productID',
					populate: {
						path: 'category',
						select: '_id name',
					},
				})

				const cartProducts = products.map(({ productID: product, quantity }) => {
					// eslint-disable-next-line no-param-reassign
					product.userQuantity = quantity
					return product
				})

				return { cartProducts }
			} catch (e) {
				return sendErrorMessage()
			}
		},
	},
}

export default resolver
