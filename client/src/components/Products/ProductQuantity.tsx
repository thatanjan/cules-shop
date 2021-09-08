import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import IconButton from '@material-ui/core/IconButton'

import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'

interface Props {}

const ProductQuantity = (props: Props) => {
	const [quantity, setQuantity] = useState(0)
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
					onClick={() => setQuantity(prev => prev + 1)}
					size='small'
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
					onChange={event => setQuantity(parseInt(event.target.value, 10))}
				/>

				<IconButton
					color='primary'
					component='span'
					disabled={quantity <= 0}
					size='small'
					onClick={() => setQuantity(prev => prev - 1)}
				>
					<RemoveIcon />
				</IconButton>
			</ButtonGroup>
		</>
	)
}

export default ProductQuantity
