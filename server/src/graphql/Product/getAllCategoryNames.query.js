import Category from 'models/Category'

const resolver = {
	Query: {
		getAllCategoryNames: async () => {
			const names = await Category.find({}, 'name')

			const result = names.map(({ name, _id }) => ({ name, categoryID: _id }))

			return result
		},
	},
}

export default resolver
