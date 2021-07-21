import useSWRgql from 'hooks/swr/useSWRgql'

import { totalCartItems } from 'graphql/queries/cartQueries'

import { TotalCartItemsResponse } from 'interfaces/cart'

export const useTotalCartItems = () =>
	useSWRgql<{}, { totalCartItems: TotalCartItemsResponse }>({
		key: totalCartItems,
		values: {},
	})
