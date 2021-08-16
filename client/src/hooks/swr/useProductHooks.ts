import useSWRgql from 'hooks/swr/useSWRgql'

import {
	getAllCategoryNames,
	getProductDetails,
	isProductInTheCart,
	getCategoryProducts,
	searchProducts,
	getReviews,
} from 'graphql/queries/productQueries'

import {
	AllCategoryName,
	GetProductDetailsResponse,
	IsProductInTheCartResponse,
	GetMultipleProductsResponse,
	GetCategoryProductsInput,
	SearchProductsInput,
	GetReviewResponse,
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
