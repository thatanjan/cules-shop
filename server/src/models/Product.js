import { Schema, createConnection } from 'mongoose'
import { config } from 'dotenv'

import Seller from 'models/Seller'
import Category from 'models/Category'

config()

const objectId = Schema.Types.ObjectId

const stringRequired = {
	type: String,
	required: true,
}

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
})

const mongooseOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	bufferCommands: false,
	bufferMaxEntries: 0,
	useFindAndModify: false,
	useCreateIndex: true,
}

export const connection = createConnection(
	process.env.MONGO_URI_PRODUCT,
	mongooseOptions
)

const product = connection.model('product', schema)

export default product
