export type AllCategoryName = Array<{
	name: string
	categoryID: string
}>

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
