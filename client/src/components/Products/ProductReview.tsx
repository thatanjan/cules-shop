import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { nanoid } from 'nanoid'
import Divider from '@material-ui/core/Divider'

import CustomRating from 'components/Ratings/CustomRating'
import ProductReviewForm from 'components/Forms/ProductReviewForm'

const ReviewStarDistribution = () => {
	return (
		<>
			{Array(5)
				.fill(0)
				.map((_, index) => (
					<Grid
						container
						key={nanoid()}
						alignItems='center'
						sx={{
							borderWidth: '5px',
							borderRadius: '1rem',
							borderColor: 'rgb(255 255 255 / 23%)',
						}}
					>
						<Grid item xs={4}>
							<CustomRating name='read-only' value={index + 1} readOnly />
						</Grid>
						<Grid item xs={6}>
							<Divider />
						</Grid>

						<Grid item xs={2}>
							<Typography align='center'> {index + 1}</Typography>
						</Grid>
					</Grid>
				))}
		</>
	)
}

const ProductReview = () => {
	return (
		<Grid container>
			<Grid item xs={12}>
				<Typography variant='h6' sx={{ margin: '1.5rem 0' }}>
					Based on X reviews
				</Typography>

				<Typography variant='h3'>0.0</Typography>
				<Typography sx={{ marginBottom: '1rem' }}>overall</Typography>

				<ReviewStarDistribution />
			</Grid>

			<Grid item xs={12}>
				<Typography>Be the first to review “Powerbank 1130 mAh Blue”</Typography>
			</Grid>

			<Grid item xs={12}>
				<ProductReviewForm />
			</Grid>
		</Grid>
	)
}

export default ProductReview
