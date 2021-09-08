import { Schema, model } from 'mongoose'
// eslint-disable-next-line import/no-cycle
import Product from './Product'

const objectId = Schema.Types.ObjectId

const schema = new Schema({
	user: { type: objectId, required: true, ref: 'user' },
	company: {
		type: String,
		required: true,
	},
	star: {
		type: Number,
		default: 0,
	},
	products: [
		{
			type: objectId,
			ref: Product,
		},
	],
})

const Seller = model('seller', schema)

export default Seller
