import React from 'react'
import { mutate } from 'swr'
import IconButton from '@material-ui/core/IconButton'
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart'

import { totalCartItems } from 'graphql/queries/cartQueries'
import createRequest from 'graphql/createRequest'

import { removeProductFromCart } from 'graphql/mutations/productMutations'

import { CommonResponse } from 'interfaces/global'
import { MutationDeps } from 'interfaces/product'

interface Props extends MutationDeps {
	productID: string
}

const DeleteFromCart = ({ productID, mutationDeps }: Props) => {
	const removeHandler = async () => {
		try {
			const {
				removeProductFromCart: { success },
			} = await createRequest<
				{ productID: string },
				{ removeProductFromCart: CommonResponse }
			>({ key: removeProductFromCart, values: { productID } })

			if (success) {
				mutationDeps.forEach(item => mutate(item))
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
