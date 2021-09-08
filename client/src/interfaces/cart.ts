export interface TotalCartItemsResponse {
	totalItems: number
	errorMessage: string
}

export interface CartProduct {
	name: string
	image: string
	price: number
	userQuantity: number
	_id: string
	seller: {
		name: string
		_id: string
	}
	category: {
		name: string
		_id: string
	}
	quantity: number
}

export interface GetAllCartProductsResponse {
	cartProducts: Array<CartProduct>
	errorMessage?: string
}

export interface TotalCartPriceResponse {
	totalPrice: number
	errorMessage: string
}
