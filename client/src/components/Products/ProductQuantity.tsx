import React, { useState } from 'react'
import { useRouter } from 'next/router'
import TextField from '@material-ui/core/TextField'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import IconButton from '@material-ui/core/IconButton'

import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'

import createRequest from 'graphql/createRequest'

import { modifyQuantity } from 'graphql/mutations/productMutations'

import { CommonResponse } from 'interfaces/global'

interface Props {
	quantity: number
	mutateQuantity: Function
}

const INCREASE = 'increase'
const DECREASE = 'decrease'

type ModifyType = typeof INCREASE | typeof DECREASE

interface ModifyQuantityInput {
	productID: string
	type: ModifyType
	amount: number
}

const ProductQuantity = ({ quantity, mutateQuantity }: Props) => {
	const {
		query: { productID },
	} = useRouter()

	const [quantityInput, setQuantityInput] = useState(quantity || 0)

	const modifyQuantityHandler = async (type: ModifyType, amount: number = 1) => {
		const {
			modifyQuantity: { success },
		} = await createRequest<
			ModifyQuantityInput,
			{ modifyQuantity: CommonResponse }
		>({
			key: modifyQuantity,
			values: { productID: productID as string, type, amount },
		})

		if (success) mutateQuantity()
	}

	const modifyQuantityHandlerWithInput = async () => {
		const difference = quantityInput - quantity

		if (!difference) return false

		let type: ModifyType = INCREASE

		if (difference < 0) {
			type = DECREASE
		}

		const {
			modifyQuantity: { success },
		} = await createRequest<
			ModifyQuantityInput,
			{ modifyQuantity: CommonResponse }
		>({
			key: modifyQuantity,
			values: {
				productID: productID as string,
				type,
				amount: Math.abs(difference),
			},
		})

		if (success) mutateQuantity()
	}

	return (
		<>
			<ButtonGroup
				sx={{
					marginTop: '1rem',
					background: 'rgba(255, 255, 255, 0.09)',
					'& .MuiTextField-root > label': { display: 'none' },
				}}
			>
				<IconButton
					color='primary'
					component='span'
					size='small'
					onClick={() => modifyQuantityHandler(INCREASE)}
				>
					<AddIcon />
				</IconButton>

				<TextField
					variant='filled'
					label='Quantity'
					value={quantityInput}
					size='small'
					InputProps={{
						sx: {
							borderRadius: '0',
							'& input': {
								textAlign: 'center',
								padding: '0.5rem',
							},
						},
					}}
					onChange={event => setQuantityInput(parseInt(event.target.value, 10))}
					onBlur={modifyQuantityHandlerWithInput}
				/>

				<IconButton
					color='primary'
					component='span'
					disabled={quantity <= 0}
					size='small'
					onClick={() => modifyQuantityHandler(DECREASE)}
				>
					<RemoveIcon />
				</IconButton>
			</ButtonGroup>
		</>
	)
}

export default ProductQuantity
