import merge from 'lodash/merge'

import typeDefs from './Cart.types'

import addProductToCartMutation from './addProductToCart.mutation'

export const cartTypeDefs = [typeDefs]

export const cartResolvers = merge(addProductToCartMutation)
