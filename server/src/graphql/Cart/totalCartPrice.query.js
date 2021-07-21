import sendErrorMessage from 'utils/errorMessage'
import Cart from 'models/Cart'

const resolver = {
	Query: {
		totalCartPrice: async (_, __, { user: { userID } }) => {
			try {
				const { products } = await Cart.findOne(
					{ user: userID },
					'products.id products.quantity'
				).populate({
					path: 'products.id',
					select: 'price',
				})

				let totalPrice = 0

				products.forEach(product => {
					const userProductQuantity = product.quantity
					const productPrice = product.id.price

					totalPrice += userProductQuantity * productPrice
				})

				return { totalPrice }
			} catch (e) {
				return sendErrorMessage()
			}
		},
	},
}

export default resolver
