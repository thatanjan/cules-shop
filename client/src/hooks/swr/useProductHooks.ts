import useSWRgql from 'hooks/swr/useSWRgql'

import {
	getAllCategoryNames,
	getProductDetails,
	isProductInTheCart,
} from 'graphql/queries/productQueries'

import {
	AllCategoryName,
	GetProductDetailsResponse,
	IsProductInTheCartResponse,
} from 'interfaces/product'

export const useGetAllCategoryNames = () =>
	useSWRgql<{}, { getAllCategoryNames: AllCategoryName }>({
		key: getAllCategoryNames,
		values: {},
	})

export const useGetProductDetails = (productID: string) =>
	useSWRgql<
		{ productID: string },
		{ getProductDetails: GetProductDetailsResponse }
	>({
		key: getProductDetails,
		values: { productID },
	})

export const useIsProductInTheCart = (productID: string) =>
	useSWRgql<
		{ productID: string },
		{ isProductInTheCart: IsProductInTheCartResponse }
	>({
		key: isProductInTheCart,
		values: { productID },
	})
