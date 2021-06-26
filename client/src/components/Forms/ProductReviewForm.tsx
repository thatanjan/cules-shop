import React, { useState, FormEventHandler } from 'react'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const ProductReviewForm = () => {
	const [description, setDescription] = useState('')

	const handleSubmit: FormEventHandler<HTMLFormElement> = event => {
		setDescription('')
		event.preventDefault()
	}

	return (
		<Box component='form' onSubmit={handleSubmit}>
			<TextField
				label='Description'
				multiline
				rows={4}
				value={description}
				variant='standard'
				fullWidth
				onChange={e => setDescription(e.target.value)}
			/>

			<Button type='submit' disabled={!description} variant='contained'>
				Submit
			</Button>
		</Box>
	)
}

export default ProductReviewForm
