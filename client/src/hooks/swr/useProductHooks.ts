import useSWRgql from 'hooks/swr/useSWRgql'

import { useUserState } from 'redux/hooks/useSliceHooks'

import {
	getAllCategoryNames,
	getProductDetails,
	isProductInTheCart,
	getCategoryProducts,
	searchProducts,
	getReviews,
	getAllSellerProducts,
	getPopularProducts,
} from 'graphql/queries/productQueries'

import {
	GetAllCategoryNamesResponse,
	GetProductDetailsResponse,
	IsProductInTheCartResponse,
	GetMultipleProductsResponse,
	GetCategoryProductsInput,
	SearchProductsInput,
	GetReviewResponse,
	GetAllSellerProductsResponse,
	GetPopularProductsResponse,
} from 'interfaces/product'

export const useGetAllCategoryNames = () =>
	useSWRgql<{}, { getAllCategoryNames: GetAllCategoryNamesResponse }>({
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
		swrDependencies: productID,
	})

export const useGetCategoryProducts = (values: GetCategoryProductsInput) => {
	const { categoryID, sortBy, skip } = values

	return useSWRgql<
		GetCategoryProductsInput,
		{ getCategoryProducts: GetMultipleProductsResponse }
	>({
		key: getCategoryProducts,
		values,
		swrDependencies: categoryID + sortBy + skip,
	})
}

export const useSearchProducts = (values: SearchProductsInput) =>
	useSWRgql<
		SearchProductsInput,
		{ searchProducts: GetMultipleProductsResponse }
	>({ key: searchProducts, values, swrDependencies: values.query + values.skip })

export const useGetReviews = (productID: string) =>
	useSWRgql<{ productID: string }, { getReviews: GetReviewResponse }>({
		key: getReviews,
		values: { productID },
	})

export const useGetAllSellerProducts = () => {
	const { sellerID } = useUserState()

	return useSWRgql<{}, { getAllSellerProducts: GetAllSellerProductsResponse }>({
		key: getAllSellerProducts,
		values: {},
		swrDependencies: sellerID,
	})
}

export const useGetPopularProducts = () => {
	return useSWRgql<{}, { getPopularProducts: GetPopularProductsResponse }>({
		key: getPopularProducts,
		values: {},
	})
}
