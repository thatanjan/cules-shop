import { Schema, model } from 'mongoose'
import Product from './Product'

const objectId = Schema.Types.ObjectId

export const product = {
	productID: {
		type: objectId,
		required: true,
		ref: Product,
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
