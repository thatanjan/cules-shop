import { Schema, createConnection } from 'mongoose'
import { config } from 'dotenv'

config()

const schema = new Schema({
	name: { type: String, required: true },
	image: { type: String, required: true },
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

const Category = connection.model('category', schema)

export default Category
