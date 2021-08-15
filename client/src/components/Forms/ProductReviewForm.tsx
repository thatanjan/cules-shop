import React, { useState, FormEventHandler } from 'react'
import { useRouter } from 'next/router'
import Box from '@material-ui/core/Box'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import CustomRating from 'components/Ratings/CustomRating'
import CustomAlert, { Severity } from 'components/Alerts/CustomAlert'

import createRequest from 'graphql/createRequest'

import { AddReviewInput } from 'interfaces/product'
import { CommonResponse } from 'interfaces/global'

import { addReview } from 'graphql/mutations/productMutations'

const ProductReviewForm = () => {
	const [description, setDescription] = useState('')
	const [ratingValue, setRatingValue] = useState(0)

	const resetInput = () => {
		setDescription('')
		setRatingValue(0)
	}

	const [alert, setAlert] = useState<{
		severity: Severity | ''
		message: String
	}>({ severity: '', message: '' })

	const {
		query: { productID },
	} = useRouter()

	const resetAlert = () =>
		setTimeout(() => setAlert({ severity: '', message: '' }), 3000)

	const handleSubmit: FormEventHandler<HTMLFormElement> = async event => {
		event.preventDefault()
		const values: AddReviewInput = {
			description,
			star: ratingValue,
			productID: productID as string,
		}

		try {
			const request = await createRequest<
				AddReviewInput,
				{ addReview: CommonResponse }
			>({
				key: addReview,
				values: values,
			})

			setAlert({ severity: 'info', message: 'Adding Reviews' })

			if (request) {
				const {
					addReview: { success, errorMessage },
				} = request

				if (success) {
					setAlert({ severity: 'success', message: 'Review added successfully' })
					resetInput()
				}

				if (errorMessage) setAlert({ severity: 'error', message: errorMessage })
				resetAlert()
			}
		} catch (e) {
			setAlert({ severity: 'error', message: 'Something went wrong' })
			resetAlert()
		}
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

			{alert.message && (
				<CustomAlert checked severity={alert.severity as Severity}>
					{alert.message}
				</CustomAlert>
			)}
		</Box>
	)
}

export default ProductReviewForm
