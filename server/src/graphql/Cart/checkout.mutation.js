import Stripe from 'stripe'

import Cart from 'models/Cart'
import Order from 'models/Order'
import Product from 'models/Product'
import Category from 'models/Category'

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

				const { products } = await Cart.findOne(
					{ user: userID },
					'products'
				).populate({
					path: 'products.productID',
					select: 'category price quantity',
				})

				if (!products.length)
					return sendErrorMessage('No product is available in cart')

				let totalPrice = 0

				products.forEach((item, index) => {
					const individualQuantity = item.quantity
					totalPrice += item.productID.price * individualQuantity
				})

				if (totalPrice < 50)
					return sendErrorMessage('Amount must be at least $0.50 usd')

				const payment = await stripe.paymentIntents.create({
					amount: totalPrice,
					currency: 'USD',
					confirm: true,
					payment_method: stripeID,
				})
				if (payment.status !== 'succeeded') return sendErrorMessage()

				const { id, amount, currency } = payment

				const orderedProducts = products.map(product => ({
					productID: product.productID._id,
					quantity: product.quantity,
					price: product.productID.price,
				}))

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

				if (!updateCart || !updateCart.nModified) return sendErrorMessage()

				const bulkUpdateArray = products.map(({ productID, quantity }) => ({
					updateOne: {
						filter: {
							_id: productID._id,
						},
						update: {
							$inc: {
								quantity: quantity * -1,
								totalSold: quantity,
							},
						},
					},
				}))

				const updateProduct = await Product.bulkWrite(bulkUpdateArray)

				if (!updateProduct.result.ok) return sendErrorMessage()

				const totalProductsPerCategory = {}

				products.forEach(product => {
					const categoryID = product.productID.category
					const prevValue = totalProductsPerCategory[categoryID] || 0

					totalProductsPerCategory[categoryID] = prevValue + product.quantity
				})

				const bulkUpdateCategory = products.map(item => ({
					updateOne: {
						filter: {
							_id: item.productID.category,
						},
						update: {
							$inc: {
								totalSold: item.quantity,
							},
						},
					},
				}))

				const updateCategory = await Category.bulkWrite(bulkUpdateCategory)

				if (!updateCategory.result.ok) return sendErrorMessage()

				return { success: true }
			} catch (err) {
				return sendErrorMessage()
			}
		},
	},
}

export default resolver
