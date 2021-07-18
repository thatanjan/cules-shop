import Product from 'models/Product'

const resolver = {
	Query: {
		getProductDetails: async (_, { productID }) => {
			const productDetails = await Product.findById(productID)
			return productDetails
		},
	},
}

export default resolver
