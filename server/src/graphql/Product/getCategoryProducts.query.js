import Product from 'models/Product'
import Cart from 'models/Cart'
import sendErrorMessage from 'utils/errorMessage'
import convertObjectID from 'utils/convertObjectID'

import { sortType } from 'variables/global'
// $map: {
// 								input: '$products.productID',
// 								as: 'productID',
// 								in: ['$$productID'],
// 							},

const resolver = {
	Query: {
		getCategoryProducts: async (
			_,
			{ Input: { skip, categoryID, sortBy } },
			{ user: { userID } }
		) => {
			try {
				const cartAggregation = Cart.aggregate()

				const [
					{
						productIDs: [productIDs],
					},
				] = await cartAggregation
					.match({
						user: convertObjectID(userID),
					})
					.group({
						_id: convertObjectID(userID),
						productIDs: { $push: '$products.productID' },
					})

				const result = await Product.find(
					{ category: categoryID },
					'name quantity category price image'
				)
					.sort(sortType[sortBy])
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
