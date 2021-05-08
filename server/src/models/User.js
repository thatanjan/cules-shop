import mongoose from 'mongoose'

const { Schema } = mongoose

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
}

const UserSchema = new Schema(schema)

const User = mongoose.model('user', UserSchema)

export default User
