import React from 'react'
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
}

const INCREASE = 'increase'
const DECREASE = 'decrease'

interface ModifyQuantityInput {
	productID: string
	type: typeof INCREASE | typeof DECREASE
	amount: number
}

const ProductQuantity = ({ quantity }: Props) => {
	const {
		query: { productID },
	} = useRouter()

	const incrementQuantity = async () => {
		const {} = await createRequest<
			ModifyQuantityInput,
			{ modifyQuantity: CommonResponse }
		>({
			key: modifyQuantity,
			values: { productID: productID as string, type: INCREASE, amount: 1 },
		})
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
					onClick={incrementQuantity}
				>
					<AddIcon />
				</IconButton>

				<TextField
					variant='filled'
					label='Quantity'
					value={quantity}
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
				/>

				<IconButton
					color='primary'
					component='span'
					disabled={quantity <= 0}
					size='small'
				>
					<RemoveIcon />
				</IconButton>
			</ButtonGroup>
		</>
	)
}

export default ProductQuantity
