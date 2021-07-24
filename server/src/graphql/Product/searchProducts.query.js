import Product from 'models/Product'
import sendErrorMessage from 'utils/errorMessage'

import { sortType } from 'variables/global'

const resolver = {
	Query: {
		searchProducts: async (_, { Input: { skip, query, sortBy } }) => {
			try {
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
				return sendErrorMessage()
			}
		},
	},
}

export default resolver
