import sendErrorMessage from 'utils/errorMessage'
import Product from 'models/Product'

const resolver = {
	Mutation: {
		createProduct: async (_, { Input }, { user: { sellerID } }) => {
			try {
				const product = new Product({ ...Input, seller: sellerID })

				await product.save()

				return { success: true }
			} catch (__) {
				return sendErrorMessage()
			}
		},
	},
}

export default resolver
