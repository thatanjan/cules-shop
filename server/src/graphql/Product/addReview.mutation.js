import sendErrorMessage from 'utils/errorMessage'
import Product from 'models/Product'
import Profile from 'models/Profile'

const resolver = {
	Mutation: {
		addReview: async (
			_,
			{ Input: { productID, description, star } },
			{ user: { userID } }
		) => {
			try {
				const starKey = `allStars.${star}`

				const ratingUpdateObject = {}
				ratingUpdateObject[starKey] = 1

				const { _id } = await Profile.findOne({ user: userID }, '_id')

				const update = await Product.updateOne(
					{ _id: productID },
					{
						$push: { reviews: { description, star, user: _id } },
						$inc: ratingUpdateObject,
					}
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
