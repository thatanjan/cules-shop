import { model, Schema } from 'mongoose'

import { product } from './Cart'
const objectId = Schema.Types.ObjectId

const stringRequired = {
	type: String,
	required: true,
}

const product = { ...product, totalPrice: { type: Number, required: true } }

const schema = new Schema({
	user: {
		type: objectId,
		required: true,
		ref: user,
	},
	shippingAddress: {
		country: stringRequired,
		city: stringRequired,
		postal: stringRequired,
		address: stringRequired,
	},
	products: [product],
	chargedMoney: { type: Number, required: true },
})

const Order = model('Order', schema)

export default Order