import React, { useState, FormEventHandler } from 'react'
import { useRouter } from 'next/router'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import CustomRating from 'components/Ratings/CustomRating'

import createRequest from 'graphql/createRequest'

import { AddReviewInput } from 'interfaces/product'
import { CommonResponse } from 'interfaces/global'

import { addReview } from 'graphql/mutations/productMutations'

const ProductReviewForm = () => {
	const [description, setDescription] = useState('')
	const [ratingValue, setRatingValue] = useState(0)

	const {
		query: { productID },
	} = useRouter()

	const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
		event.preventDefault()
		const values: AddReviewInput = {
			description,
			star: ratingValue,
			productID: productID as string,
		}
		const request = await createRequest<AddReviewInput, CommonResponse>({
			key: addReview,
			values: values,
		})

		console.log(request)

		setDescription('')
		setRatingValue(0)
		event.preventDefault()
	}

	return (
		<Box component='form' onSubmit={handleSubmit}>
			<CustomRating
				value={ratingValue}
				onChange={(_, newValue) => {
					setRatingValue(newValue)
				}}
			/>

			<TextField
				label='Description'
				multiline
				rows={4}
				value={description}
				variant='standard'
				fullWidth
				onChange={e => setDescription(e.target.value)}
				sx={{
					marginBottom: '.5rem',
				}}
			/>

			<Button
				type='submit'
				disabled={!description || !ratingValue}
				variant='contained'
				size='small'
			>
				Submit
			</Button>
		</Box>
	)
}

export default ProductReviewForm
