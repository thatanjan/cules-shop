import { Schema, model } from 'mongoose'

const schema = new Schema({
	name: { type: String, required: true },
})

const Category = model('category', schema)

export default Category
