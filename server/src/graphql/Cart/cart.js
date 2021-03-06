import merge from 'lodash/merge'

import typeDefs from './Cart.types'

import addProductToCartMutation from './addProductToCart.mutation'
import modifyQuantityMutation from './modifyQuantity.mutation'
import removeProductFromCartMutation from './removeProductFromCart.mutation'
import checkoutMutation from './checkout.mutation'

import isProductInTheCart from './isProductInTheCart.query'
import totalCartItems from './totalCartItems.query'
import totalCartPrice from './totalCartPrice.query'
import getAllCartProducts from './getAllCartProducts.query'

export const cartTypeDefs = [typeDefs]

export const cartResolvers = merge(
	addProductToCartMutation,
	modifyQuantityMutation,
	removeProductFromCartMutation,
	isProductInTheCart,
	totalCartItems,
	totalCartPrice,
	getAllCartProducts,
	checkoutMutation
)
