import { Schema } from 'mongoose'

export const objectId = Schema.Types.ObjectId

export const sortType = {
	NAME: 'name',
	HIGH_PRICE: '-price',
	LOW_PRICE: 'price',
}
