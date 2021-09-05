import { Key } from 'swr'

export type AllCategoryName = Array<{
	name: string
	_id: string
	image: string
}>

export interface GetAllCategoryNamesResponse {
	categories: AllCategoryName
	errorMessage?: string
}

export interface GetCategoryProductsInput {
	skip: number
	categoryID: string
	sortBy: string
}

export type MultiPleProducts = Array<{
	_id: string
	name: string
	price: number
	category: { name: string; _id: string }
	image: string
	alreadyInCart: null | boolean
}>

export interface GetMultipleProductsResponse {
	products: MultiPleProducts
	totalProducts: number
	errorMessage: string
}

export interface GetProductDetailsResponse {
	name: string
	description: string
	category: {
		name: string
		_id: string
	}
	seller: string
	price: number
	quantity: number
	image: string
}

export interface IsProductInTheCartResponse {
	exist: boolean
	errorMessage: string
	quantity: number
}

export interface SearchProductsInput {
	skip: number
	query: string
	sortBy: string
}

export interface MutationDeps {
	mutationDeps: Array<[Key, string | number | undefined]>
}

export interface AddReviewInput {
	description: string
	productID: string
	star: number
}

export interface Review {
	_id: string
	description: string
	user: {
		user: string
		name: string
		profilePicture: string
	}
	star: number
	date: string
}

export interface GetReviewResponse {
	totalReviews: number
	averageStars: number
	reviews: Array<Review>
}

export interface GetAllSellerProductsResponse {
	products: Array<{
		_id: string
		name: string
		price: number
		category: { name: string; _id: string }
		image: string
	}>
}
