import Profile from 'models/Profile'
import sendErrorMessage from 'utils/errorMessage'

const resolver = {
	Query: {
		getMyAddress: async (_, __, { user: { userID } }) => {
			try {
				const myAddress = await Profile.findOne({ user: userID }, 'address')

				return myAddress.address
			} catch (e) {
				return sendErrorMessage(e)
			}
		},
	},
}

export default resolver
