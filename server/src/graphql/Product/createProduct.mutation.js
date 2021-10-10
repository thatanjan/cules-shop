import sendErrorMessage from 'utils/errorMessage'
import uploadImage from 'utils/cloudinary/uploadToCloudinary'
import Product from 'models/Product'
import Category from 'models/Category'
import { productImageConfig } from 'variables/cloudinaryVariables'

const PATH = 'cules-shop/products/'

const resolver = {
	Mutation: {
		createProduct: async (_, { Input }, { user: { sellerID } }) => {
			try {
				const { image } = Input

				const product = new Product({ ...Input, seller: sellerID })

				const imageID = await uploadImage(image, {
					folder: PATH,
					...productImageConfig,
				})

				if (typeof imageID === 'string') {
					product.image = imageID
				}

				await product.save()

				const { category } = Input

				const updateCategory = await Category.updateOne(
					{ _id: category },
					{
						$push: { products: product._id },
						$inc: { totalProducts: 1 },
					}
				)

				if (!updateCategory || !updateCategory.nModified) return sendErrorMessage()

				return { success: true, productID: product._id }
			} catch (__) {
				return sendErrorMessage()
			}
		},
	},
}

export default resolver
