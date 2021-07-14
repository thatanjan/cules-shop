import Profile from 'models/Profile'
import sendErrorMessage from 'utils/errorMessage'

const resolver = {
	Query: {
		getMultipleUserNameImage: async (_, { Input: { userIDs } }) => {
			try {
				const users = await Profile.find({ user: { $in: userIDs } }, 'name')

				const result = users.map(user => {
					user.image = ''
					return user
				})

				return result
			} catch (e) {
				return sendErrorMessage(e)
			}
		},
	},
}

export default resolver
