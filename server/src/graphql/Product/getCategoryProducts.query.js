import Product from 'models/Product'
import sendErrorMessage from 'utils/errorMessage'

import { sortType } from 'variables/global'

const resolver = {
	Query: {
		getCategoryProducts: async (_, { Input: { skip, categoryID, sortBy } }) => {
			try {
				const result = await Product.find(
					{ category: categoryID },
					'name quantity category price image'
				)
					.skip(skip)
					.sort(sortType[sortBy])
					.limit(30)
					.populate('category')

				return { products: result }
			} catch (e) {
				return sendErrorMessage()
			}
		},
	},
}

export default resolver
