import { Schema, model } from 'mongoose'
import Product from './Product'

const objectId = Schema.Types.ObjectId

const schema = new Schema({
	user: {
		type: objectId,
		required: true,
		ref: 'user',
		unique: true,
	},
	company: {
		type: String,
		required: true,
	},
	star: {
		type: Number,
		default: 0,
	},
	products: [{ type: objectId, ref: Product, unique: true }],
})

const Seller = model('seller', schema)

export default Seller