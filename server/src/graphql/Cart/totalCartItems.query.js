import convertObjectID from 'utils/convertObjectID'
import sendErrorMessage from 'utils/errorMessage'
import Cart from 'models/Cart'

const resolver = {
	Query: {
		totalCartItems: async (_, __, { user: { userID } }) => {
			try {
				const aggregate = Cart.aggregate()

				const result = await aggregate
					.match({
						user: convertObjectID(userID),
					})
					.project({ totalItems: { $size: '$products' } })

				return { totalItems: parseInt(result[0].totalItems, 10) }
			} catch (e) {
				return sendErrorMessage()
			}
		},
	},
}

export default resolver
