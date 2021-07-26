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
import createRequest from 'graphql/createRequest'

import { removeProductFromCart } from 'graphql/mutations/productMutations'

import { CommonResponse } from 'interfaces/global'

interface Props {
	productID: string
}

const DeleteFromCart = ({ productID }: Props) => {
	const { route } = useRouter()
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
