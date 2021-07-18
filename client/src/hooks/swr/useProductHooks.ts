import useSWRgql from 'hooks/swr/useSWRgql'

import {
	getAllCategoryNames,
	getProductDetails,
} from 'graphql/queries/productQueries'

import { AllCategoryName, GetProductDetailsResponse } from 'interfaces/product'

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
