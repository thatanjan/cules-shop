import { Schema, model } from 'mongoose'

import { connection } from './Product'

const schema = new Schema({
	name: { type: String, required: true },
})

const Category = connection.model('category', schema)

export default Category
