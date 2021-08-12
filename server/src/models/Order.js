import { model, Schema } from 'mongoose'

import { product } from './Cart'

const objectId = Schema.Types.ObjectId

const stringRequired = {
	type: String,
	required: true,
}

const product = {
	...product,
	categoryID: stringRequired,
	price: { type: Number, required: true },
}

const schema = new Schema({
	user: {
		type: objectId,
		required: true,
		ref: user,
	},
	shippingDetails: {
		country: stringRequired,
		city: stringRequired,
		postal: stringRequired,
		address: stringRequired,
		name: stringRequired,
	},
	products: [product],
	chargedMoney: { type: Number, required: true },
	orderID: stringRequired,
	currency: stringRequired,
	date: {
		type: Date,
		default: Date.now,
	},
})

const Order = model('Order', schema)

export default Order
