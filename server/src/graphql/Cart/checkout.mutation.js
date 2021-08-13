import Stripe from 'stripe'

import Cart from 'models/Cart'
import Order from 'models/Order'
import Product from 'models/Product'

import sendErrorMessage from 'utils/errorMessage'

const resolver = {
	Mutation: {
		checkout: async (
			_,
			{ Input: { stripeID, shippingDetails } },
			{ user: { userID } }
		) => {
			try {
				const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

				const { products } = await Cart.findOne({ user: userID }, 'products')

				if (!products.length)
					return sendErrorMessage('No product is available in cart')

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

				const updateCart = await Cart.updateOne(
					{ user: userID },
					{ $set: { products: [] } }
				)

				console.log(updateCart)

				if (!updateCart) return sendErrorMessage()

				const bulkUpdateArray = products.map(({ productID, userQuantity }) => ({
					updateOne: {
						filter: {
							_id: productID,
						},
						update: {
							$inc: {
								quantity: userQuantity * -1,
							},
						},
					},
				}))

				const updateProduct = await Product.bulkWrite(bulkUpdateArray)

				if (!updateProduct.result.ok) return sendErrorMessage()

				return { success: true }
			} catch (err) {
				return sendErrorMessage()
			}
		},
	},
}

export default resolver
