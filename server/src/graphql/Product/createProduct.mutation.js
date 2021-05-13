import sendErrorMessage from 'utils/errorMessage'
import Product from 'models/Product'

const resolver = {
	Mutation: {
		createProduct: async (_, { Input }, { user: { id } }) => {
			try {
				const product = new Product({ ...Input, seller: id })

				await product.save()

				return true
			} catch (__) {
				return sendErrorMessage()
			}
		},
	},
}

export default resolver
