import Profile from 'models/Profile'

const resolver = {
	Query: {
		getMultipleUserNameImage: async (_, { Input: { userIDs } }) => {
			const users = await Profile.find({ user: { $in: userIDs } }, 'name')

			const result = users.map(user => {
				user.image = ''
				return user
			})

			return result
		},
	},
}

export default resolver
