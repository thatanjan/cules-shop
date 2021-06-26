import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'

const ProductReviewForm = () => {
	const [description, setDescription] = useState('')
	return (
		<Box component='form'>
			<TextField
				label='Description'
				multiline
				rows={4}
				value={description}
				variant='standard'
				fullWidth
				onChange={e => setDescription(e.target.value)}
			/>
		</Box>
	)
}

export default ProductReviewForm
