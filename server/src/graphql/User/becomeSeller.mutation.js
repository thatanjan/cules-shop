import Seller from 'models/Seller'

import sendErrorMessage from 'utils/errorMessage'

const resolver = {
	Mutation: {
		becomeSeller: async (_, __, { user: { id } }) => {
			try {
				const newSeller = new Seller({ user: id, company: 'Cules Coding' })

				await newSeller.save()

				return { success: true }
			} catch (___) {
				return sendErrorMessage('sorry, something went wrong')
			}
		},
	},
}

export default resolver
