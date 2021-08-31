import Product from 'models/Product'
import convertObjectID from 'utils/convertObjectID'
import sendErrorMessage from 'utils/errorMessage'

const resolver = {
	Query: {
		getAllSellerProducts: async (_, __, { user: { sellerID } }) => {
			try {
				const productAggregation = Product.aggregate()
				const projection = { name: 1, quantity: 1, category: 1, price: 1, image: 1 }
				const products = await productAggregation
					.match({
						seller: convertObjectID(sellerID),
					})
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
				return sendErrorMessage()
			}
		},
	},
}

export default resolver
