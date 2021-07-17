import sendErrorMessage from 'utils/errorMessage'
import uploadImage from 'utils/cloudinary/uploadToCloudinary'
import Product from 'models/Product'
import imageConfig from 'variables/cloudinaryVariables'

const PATH = 'cules-shop/products/'

const resolver = {
	Mutation: {
		createProduct: async (_, { Input }, { user: { sellerID } }) => {
			try {
				const { image } = Input

				const product = new Product({ ...Input, seller: sellerID })

				const imageID = await uploadImage(image, {
					folder: PATH,
					...imageConfig,
				})

				if (typeof imageID === 'string') {
					product.image = imageID
				}

				await product.save()

				return { success: true, productID: product._id }
			} catch (__) {
				return sendErrorMessage()
			}
		},
	},
}

export default resolver
