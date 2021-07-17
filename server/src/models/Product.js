import { Schema, createConnection } from 'mongoose'
import { config } from 'dotenv'

config()

const objectId = Schema.Types.ObjectId

const stringRequired = {
	type: String,
	required: true,
}

const schema = new Schema({
	name: stringRequired,
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
	},
	category: { type: objectId, required: true },
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
