import useSWRgql from 'hooks/swr/useSWRgql'

import { totalCartItems, getAllCartProducts } from 'graphql/queries/cartQueries'

import {
	TotalCartItemsResponse,
	GetAllCartProductsResponse,
} from 'interfaces/cart'

export const useTotalCartItems = () =>
	useSWRgql<{}, { totalCartItems: TotalCartItemsResponse }>({
		key: totalCartItems,
		values: {},
	})

export const useGetAllCartProducts = () =>
	useSWRgql<{}, { getAllCartProducts: GetAllCartProductsResponse }>({
		key: getAllCartProducts,
		values: {},
	})
