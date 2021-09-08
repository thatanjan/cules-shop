import Profile from 'models/Profile'
import sendErrorMessage from 'utils/errorMessage'

const resolver = {
	Query: {
		getMultipleProfile: async (_, { Input: { userIDs } }) => {
			try {
				const users = await Profile.find({ user: { $in: userIDs } })

				return users
			} catch (e) {
				return sendErrorMessage(e)
			}
		},
	},
}

export default resolver
