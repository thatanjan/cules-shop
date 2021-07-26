import Product from 'models/Product'
import Cart from 'models/Cart'
import sendErrorMessage from 'utils/errorMessage'
import convertObjectID from 'utils/convertObjectID'

import { sortType } from 'variables/global'

const resolver = {
	Query: {
		getCategoryProducts: async (
			_,
			{ Input: { skip, categoryID, sortBy } },
			{ user: { userID } }
		) => {
			try {
				let cartProductIDs = []

				if (userID) {
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

				const productAggregation = Product.aggregate()

				const projection = { name: 1, quantity: 1, category: 1, price: 1, image: 1 }

				if (userID) {
					projection.alreadyInCart = {
						$in: ['$_id', cartProductIDs],
					}
				}

				const products = await productAggregation
					.match({
						category: convertObjectID(categoryID),
					})
					.sort(sortType[sortBy])
					.skip(skip)
					.limit(30)
					.lookup({
						from: 'categories',
						localField: 'name _id',
						foreignField: 'categoryID',
						as: 'category',
					})
					.unwind('$category')
					.project(projection)

				return { products }
			} catch (e) {
				console.log(e)
				return sendErrorMessage()
			}
		},
	},
}

export default resolver
