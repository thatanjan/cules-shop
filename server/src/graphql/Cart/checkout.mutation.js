import Stripe from 'stripe'

import Cart from 'models/Cart'
import Product from 'models/Product'

import sendErrorMessage from 'utils/errorMessage'

const resolver = {
	Mutation: {
		checkout: async (
			_,
			{ Input: { products, stripeID, checkoutDetails } },
			{ user: { userID } }
		) => {
			try {
				const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

				// const   [ productID, categoryID, userQuantity, stripeID ] = products

				const productIDs = products.map(product => product.productID)

				const res = await Product.find({ _id: { $in: productIDs } }, 'price')

				let totalPrice = 0

				res.forEach((item, index) => {
					const individualQuantity = products[index].userQuantity
					totalPrice += item.price * individualQuantity
				})

				const payment = await stripe.paymentIntents.create({
					amount: totalPrice,
					currency: 'USD',
					confirm: true,
					payment_method: stripeID,
				})

				console.log(payment)

				return { success: true }
			} catch (err) {
				return sendErrorMessage()
			}
		},
	},
}

export default resolver