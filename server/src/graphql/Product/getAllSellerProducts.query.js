import Product from 'models/Product'
import convertObjectID from 'utils/convertObjectID'
import sendErrorMessage from 'utils/errorMessage'

const resolver = {
	Query: {
		getAllSellerProducts: async (_, __, { user: { sellerID } }) => {
			try {
				const projection = { name: 1, quantity: 1, category: 1, price: 1, image: 1 }

				const products = await Product.find(
					{
						seller: convertObjectID(sellerID),
					},
					projection
				).populate({
					path: 'category',
					select: '_id name',
				})

				console.log(products)
				return { products }
			} catch (e) {
				return sendErrorMessage()
			}
		},
	},
}

export default resolver
