import React, { useState, useEffect } from 'react'
import { mutate } from 'swr'
import TextField from '@material-ui/core/TextField'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import IconButton from '@material-ui/core/IconButton'

import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'

import createRequest from 'graphql/createRequest'
import { modifyQuantity } from 'graphql/mutations/productMutations'
import { totalCartPrice } from 'graphql/queries/cartQueries'

import { CommonResponse } from 'interfaces/global'

export interface Props {
	userQuantity?: number
	productID: string
	productQuantity: number
}

interface PropsWithMutate extends Props {
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

const ProductQuantity = ({
	userQuantity,
	productID,
	mutateQuantity,
	productQuantity,
}: PropsWithMutate) => {
	const [quantityInput, setQuantityInput] = useState<number | ''>(
		userQuantity || 1
	)

	useEffect(() => {
		setQuantityInput(userQuantity)
	}, [userQuantity])

	const modifyQuantityHandler = async (type: ModifyType, amount: number = 1) => {
		const {
			modifyQuantity: { success },
		} = await createRequest<
			ModifyQuantityInput,
			{ modifyQuantity: CommonResponse }
		>({
			key: modifyQuantity,
			values: { productID, type, amount },
		})

		if (success) {
			mutateQuantity()
			mutate([totalCartPrice, undefined])
		}
	}

	const modifyQuantityHandlerWithInput = async () => {
		if (!quantityInput) setQuantityInput(1)
		if (quantityInput === 0) return false

		const difference = (quantityInput as number) - userQuantity

		if (!difference || quantityInput > productQuantity) return false

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
				productID,
				type,
				amount: Math.abs(difference),
			},
		})

		if (success) {
			mutateQuantity()
			mutate([totalCartPrice, undefined])
		}
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
					disabled={quantityInput >= productQuantity}
				>
					<AddIcon />
				</IconButton>

				<TextField
					error={quantityInput === 0 || quantityInput > productQuantity}
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
					helperText={
						(quantityInput === 0 && 'Quantity must be more than 0') ||
						(quantityInput > productQuantity &&
							`Cannot order more than ${productQuantity}`)
					}
					onChange={event =>
						setQuantityInput(parseInt(event.target.value, 10) || '')
					}
					onBlur={modifyQuantityHandlerWithInput}
				/>

				<IconButton
					color='primary'
					component='span'
					disabled={userQuantity === 1}
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
