import Cart from 'models/Cart'
import sendErrorMessage from 'utils/errorMessage'

const resolver = {
	Query: {
		getAllCartProducts: async (_, __, { user: { userID } }) => {
			try {
				const result = await Cart.findOne(
					{ user: userID },
					'products.productID products.quantity'
				).populate({
					path: 'products.productID',
					populate: {
						path: 'category seller',
						select: '_id name company',
					},
				})

				console.log(JSON.stringify(result, undefined, 2))
			} catch (e) {
				console.log(e)
				return sendErrorMessage()
			}
		},
	},
}

export default resolver
