export type AllCategoryName = Array<{
	name: string
	categoryID: string
}>

export interface GetCategoryProductsInput {
	skip: number
	categoryID: string
	sortBy: string
}

export interface GetMultipleProductsResponse {
	products: Array<{
		_id: string
		name: string
		price: number
		category: { name: string; _id: string }
		image: string
		alreadyInCart: null | boolean
	}>
	totalProducts: number
	errorMessage: string
}

export interface GetProductDetailsResponse {
	name: string
	description: string
	category: string
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
