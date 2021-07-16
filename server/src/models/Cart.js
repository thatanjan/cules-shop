import { Schema, model } from 'mongoose'

const objectId = Schema.Types.ObjectId

const product = {
	id: {
		type: objectId,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
}

const schema = new Schema({
	products: [product],
	totalQuantity: {
		type: Number,
		default: 0,
	},
	user: {
		type: objectId,
		required: true,
		ref: 'user',
	},
})

const Cart = model('cart', schema)

export default Cart
