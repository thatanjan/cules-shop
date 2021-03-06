import sendErrorMessage from 'utils/errorMessage'
import Category from 'models/Category'

const resolver = {
	Query: {
		getAllCategoryNames: async () => {
			try {
				const categories = await Category.find({}).sort('-totalSold')

				return { categories }
			} catch (e) {
				return sendErrorMessage()
			}
		},
	},
}

export default resolver
