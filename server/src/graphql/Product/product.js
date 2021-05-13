import merge from 'lodash/merge'

import typeDefs from './product.types'

import createProduct from './createProduct.mutation'

export const productTypeDefs = [typeDefs]

export const productResolvers = merge(createProduct)
