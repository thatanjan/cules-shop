import mongoose from 'mongoose'

const { Schema } = mongoose
const objectId = Schema.Types.ObjectId

const schema = {
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	profile: {
		type: objectId,
		required: true,
	},
	seller: {
		type: objectId,
		default: '',
	},
}

const UserSchema = new Schema(schema)

const User = mongoose.model('user', UserSchema)

export default User
