import { Schema, model } from 'mongoose'

const objectId = Schema.Types.ObjectId

const stringDefault = {
	type: String,
	default: '',
}

const schema = {
	name: {
		type: String,
		required: true,
	},
	address: {
		country: stringDefault,
		city: stringDefault,
		postal: stringDefault,
		address: stringDefault,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	user: {
		type: objectId,
		required: true,
	},
}

const ProfileSchema = new Schema(schema)

const Profile = model('profile', ProfileSchema)

export default Profile
