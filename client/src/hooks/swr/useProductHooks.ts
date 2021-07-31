import useSWRgql from 'hooks/swr/useSWRgql'

import {
	getAllCategoryNames,
	getProductDetails,
	isProductInTheCart,
	getCategoryProducts,
	searchProducts,
} from 'graphql/queries/productQueries'

import {
	AllCategoryName,
	GetProductDetailsResponse,
	IsProductInTheCartResponse,
	GetMultipleProductsResponse,
	GetCategoryProductsInput,
	SearchProductsInput,
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

export const useGetCategoryProducts = (values: GetCategoryProductsInput) =>
	useSWRgql<
		GetCategoryProductsInput,
		{ getCategoryProducts: GetMultipleProductsResponse }
	>({ key: getCategoryProducts, values })

export const useSearchProducts = (values: SearchProductsInput) =>
	useSWRgql<
		SearchProductsInput,
		{ searchProducts: GetMultipleProductsResponse }
	>({ key: searchProducts, values, conditionState: values.query ? true : false })
