import jwt from 'jsonwebtoken'
import Seller from 'models/Seller'

import sendErrorMessage from 'utils/errorMessage'

const resolver = {
	Mutation: {
		becomeSeller: async (_, { Input }, { user: { userID } }) => {
			try {
				const newSeller = new Seller({ user: userID, ...Input })

				await newSeller.save()

				const payload = { userID, sellerID: newSeller._id }

				const token = jwt.sign(payload, process.env.SECRET_KEY, {
					expiresIn: '7d',
				})

				return { success: true, token }
			} catch (___) {
				return sendErrorMessage('sorry, something went wrong')
			}
		},
	},
}

export default resolver
