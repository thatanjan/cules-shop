import Product from 'models/Product'
import Cart from 'models/Cart'
import sendErrorMessage from 'utils/errorMessage'
import convertObjectID from 'utils/convertObjectID'

import { sortType } from 'variables/global'

const resolver = {
	Query: {
		searchProducts: async (_, { Input: { skip, query, sortBy } }, { user }) => {
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
					.match({
						$text: {
							$search: query,
						},
					})
					.sort(sortType[sortBy])
					.skip(skip)
					.limit(30)
					.project(projection)

				await Product.populate(products, 'category')

				return { products, totalProducts: products.length }
			} catch (e) {
				return sendErrorMessage()
			}
		},
	},
}

export default resolver
