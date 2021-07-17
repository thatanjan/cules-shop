import useSWRgql from 'hooks/swr/useSWRgql'

import { getAllCategoryNames } from 'graphql/queries/productQueries'

import { AllCategoryName } from 'interfaces/product'

export const useGetAllCategoryNames = () =>
	useSWRgql<{}, { getAllCategoryNames: AllCategoryName }>({
		key: getAllCategoryNames,
		values: {},
	})
