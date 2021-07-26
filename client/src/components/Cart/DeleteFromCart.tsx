import React from 'react'
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
	const removeHandler = async () => {
		console.log('runs')
		try {
			const {
				removeProductFromCart: { success },
			} = await createRequest<
				{ productID: string },
				{ removeProductFromCart: CommonResponse }
			>({ key: removeProductFromCart, values: { productID } })

			if (success) {
				mutate([getAllCartProducts, undefined])
				mutate([totalCartPrice, undefined])
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
