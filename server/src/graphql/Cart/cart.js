import merge from 'lodash/merge'

import typeDefs from './Cart.types'

import addProductToCartMutation from './addProductToCart.mutation'
import modifyQuantityMutation from './modifyQuantity.mutation'
import removeProductFromCartMutation from './removeProductFromCart.mutation'

export const cartTypeDefs = [typeDefs]

export const cartResolvers = merge(
	addProductToCartMutation,
	modifyQuantityMutation,
	removeProductFromCartMutation
)
