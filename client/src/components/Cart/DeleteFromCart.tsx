import React from 'react'
import { useRouter } from 'next/router'
import { mutate } from 'swr'
import IconButton from '@material-ui/core/IconButton'
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart'

import {
	getAllCartProducts,
	totalCartPrice,
	totalCartItems,
} from 'graphql/queries/cartQueries'
import {
	getCategoryProducts,
	searchProducts,
} from 'graphql/queries/productQueries'
import createRequest from 'graphql/createRequest'

import { removeProductFromCart } from 'graphql/mutations/productMutations'

import { CommonResponse } from 'interfaces/global'

interface Props {
	productID: string
}

const DeleteFromCart = ({ productID }: Props) => {
	const { route, query } = useRouter()
	const removeHandler = async () => {
		try {
			const {
				removeProductFromCart: { success },
			} = await createRequest<
				{ productID: string },
				{ removeProductFromCart: CommonResponse }
			>({ key: removeProductFromCart, values: { productID } })

			if (success) {
				switch (route) {
					case '/cart':
						mutate([getAllCartProducts, undefined])
						mutate([totalCartPrice, undefined])

					case '/category/[category]':
						mutate([getCategoryProducts, undefined])

					case '/search':
						const queryString = query.query
						const skip = query.page ? (parseInt(query.page as string) - 1) * 30 : 0
						mutate([searchProducts, (queryString as string) + skip])
				}
				mutate([totalCartItems, undefined])
			}
		} catch (error) {}
	}

	return (
		<>
			<IconButton onClick={() => removeHandler()}>
				<RemoveShoppingCartIcon />{' '}
			</IconButton>
		</>
	)
}

export default DeleteFromCart
