import { Schema, createConnection } from 'mongoose'
import { config } from 'dotenv'

config()

const objectId = Schema.Types.ObjectId

const stringRequired = {
	type: String,
	required: true,
}

const schema = new Schema({
	name: { ...stringRequired, unique: true },
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
	totalBuyers: {
		type: Number,
		default: 0,
	},
	totalSold: {
		type: Number,
		default: 0,
	},
	seller: {
		type: objectId,
		required: true,
	},
	category: { type: objectId, required: true },
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
