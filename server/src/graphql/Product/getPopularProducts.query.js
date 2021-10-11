import Product from 'models/Product'
import Cart from 'models/Cart'
import sendErrorMessage from 'utils/errorMessage'
import convertObjectID from 'utils/convertObjectID'

const resolver = {
	Query: {
		getPopularProducts: async (_, __, { user }) => {
			try {
				let cartProductIDs = []

				if (user) {
					const { userID } = user
					const userObjectID = convertObjectID(userID)
					const cartAggregation = Cart.aggregate()

					const [
						{
							productIDs: [productIDs],
						},
					] = await cartAggregation
						.match({
							user: userObjectID,
						})
						.group({
							_id: userObjectID,
							productIDs: { $push: '$products.productID' },
						})

					cartProductIDs = productIDs
				}

				const projection = { name: 1, quantity: 1, category: 1, price: 1, image: 1 }

				if (user) {
					projection.alreadyInCart = {
						$in: ['$_id', cartProductIDs],
					}
				}

				const productAggregation = Product.aggregate()

				const products = await productAggregation
					.match({ quantity: { $gt: 0 } })
					.sort('-totalSold')
					.limit(50)
					.limit(30)
					.project(projection)

				await Product.populate(products, {
					path: 'category',
					select: 'name _id image',
				})

				return { products }
			} catch (e) {
				return sendErrorMessage()
			}
		},
	},
}

export default resolver
