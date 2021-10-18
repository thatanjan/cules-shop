import mongoose from 'mongoose'

import Profile from 'models/Profile'

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
		ref: Profile,
	},
	seller: {
		type: objectId,
	},
}

const UserSchema = new Schema(schema)

const User = mongoose.model('user', UserSchema)

export default User
