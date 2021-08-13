import Stripe from 'stripe'

import Cart from 'models/Cart'
import Order from 'models/Order'
import Product from 'models/Product'

import sendErrorMessage from 'utils/errorMessage'

const resolver = {
	Mutation: {
		checkout: async (
			_,
			{ Input: { products, stripeID, shippingDetails } },
			{ user: { userID } }
		) => {
			try {
				const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

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

				if (payment.status !== 'succeeded') return sendErrorMessage()

				const { id, amount, currency } = payment

				const orderedProducts = products.map(
					({ productID, categoryID, userQuantity }, index) => ({
						productID,
						categoryID,
						quantity: userQuantity,
						price: res[index].price,
					})
				)

				const order = new Order({
					orderID: id,
					user: userID,
					chargedMoney: amount,
					currency,
					products: orderedProducts,
					shippingDetails,
				})

				await order.save()

				return { success: true }
			} catch (err) {
				console.log(err)
				return sendErrorMessage()
			}
		},
	},
}

export default resolver
