import sendErrorMessage from 'utils/errorMessage'
import Product from 'models/Product'

const resolver = {
	Mutation: {
		addReview: async (
			_,
			{ Input: { productID, description, star } },
			{ user: { userID } }
		) => {
			try {
				const update = await Product.updateOne(
					{ _id: productID },
					{ $push: { reviews: { description, star, user: userID } } }
				)

				if (update.nModified) return { success: true }

				return sendErrorMessage()
			} catch (err) {
				return sendErrorMessage()
			}
		},
	},
}

export default resolver
