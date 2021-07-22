import React from 'react'
import { mutate } from 'swr'
import Button from '@material-ui/core/Button'

import { totalCartItems, getAllCartProducts } from 'graphql/queries/cartQueries'
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

			if (success) mutate(getAllCartProducts)
		} catch (error) {}
	}

	return (
		<>
			<Button onClick={() => removeHandler()}>Delete</Button>
		</>
	)
}

export default DeleteFromCart
