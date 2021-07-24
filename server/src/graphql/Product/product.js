import merge from 'lodash/merge'

import typeDefs from './product.types'

import createProduct from './createProduct.mutation'
import getAllCategoryNames from './getAllCategoryNames.query'
import getProductDetails from './getProductDetails.query'
import getCategoryProducts from './getCategoryProducts.query'

export const productTypeDefs = [typeDefs]

export const productResolvers = merge(
	createProduct,
	getAllCategoryNames,
	getProductDetails,
	getCategoryProducts
)
