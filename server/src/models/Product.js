import { Schema } from 'mongoose'

import Profile from 'models/Profile'
// eslint-disable-next-line import/no-cycle
import Seller from 'models/Seller'
import Category, { connection } from 'models/Category'

const objectId = Schema.Types.ObjectId

const stringRequired = {
	type: String,
	required: true,
}

const reviewSchema = new Schema({
	user: {
		type: objectId,
		required: true,
		ref: Profile,
	},
	description: stringRequired,
	star: {
		type: Number,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
})

const schema = new Schema({
	name: { ...stringRequired, text: true },
	shortDescription: stringRequired,
	description: stringRequired,
	price: {
		type: Number,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
	seller: {
		type: objectId,
		required: true,
		ref: Seller,
	},
	category: {
		type: objectId,
		required: true,
		ref: Category,
	},
	image: stringRequired,
	reviews: [reviewSchema],
	allStars: {
		1: { type: Number, default: 0 },
		2: { type: Number, default: 0 },
		3: { type: Number, default: 0 },
		4: { type: Number, default: 0 },
		5: { type: Number, default: 0 },
	},
})

const product = connection.model('product', schema)

export default product
