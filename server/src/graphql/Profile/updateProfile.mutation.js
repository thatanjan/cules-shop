import successResponse from 'utils/successResponse'
import Profile from 'models/Profile'
import sendErrorMessage from 'utils/errorMessage'

const resolver = {
	Mutation: {
		updateProfile: async (_, { Input }, { user: { userID } }) => {
			try {
				await Profile.updateOne({ user: userID }, { $set: Input })

				return successResponse()
			} catch (e) {
				return sendErrorMessage(e)
			}
		},
	},
}

export default resolver
