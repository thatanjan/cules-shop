import Product from 'models/Product'
import Cart from 'models/Cart'
import sendErrorMessage from 'utils/errorMessage'
import convertObjectID from 'utils/convertObjectID'

import { sortType } from 'variables/global'

const resolver = {
	Query: {
		searchProducts: async (
			_,
			{ Input: { skip, query, sortBy } },
			{ user: { userID } }
		) => {
			try {
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

				const result = await Product.find(
					{
						$text: {
							$search: query,
						},
					},
					'name quantity category price image'
				)
					.sort(
						sortType[sortBy] === 'name'
							? { score: { $meta: 'textScore' } }
							: sortType[sortBy]
					)
					.skip(skip)
					.limit(30)
					.populate('category')

				return { products: result }
			} catch (e) {
				console.log(e)
				return sendErrorMessage()
			}
		},
	},
}

export default resolver
