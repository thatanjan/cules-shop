import useSWRgql from 'hooks/swr/useSWRgql'

import {
	totalCartItems,
	getAllCartProducts,
	totalCartPrice,
} from 'graphql/queries/cartQueries'

import {
	TotalCartItemsResponse,
	GetAllCartProductsResponse,
	TotalCartPriceResponse,
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

export const useGetTotalCartPrice = () =>
	useSWRgql<{}, { totalCartPrice: TotalCartPriceResponse }>({
		key: totalCartPrice,
		values: {},
	})
