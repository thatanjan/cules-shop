import React from 'react'
import { useRouter } from 'next/router'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { nanoid } from 'nanoid'
import Divider from '@material-ui/core/Divider'

import CustomRating from 'components/Ratings/CustomRating'
import ProductReviewForm from 'components/Forms/ProductReviewForm'

import ProductReviewList from 'components/Reviews/ReviewList'

import { useGetReviews } from 'hooks/swr/useProductHooks'

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

const ReviewResult = () => {
	const {
		query: { productID },
	} = useRouter()
	const { data } = useGetReviews(productID as string)

	if (!data) return null

	const {
		getReviews: { totalReviews, averageStars },
	} = data

	return (
		<Grid item xs={12} md={6}>
			<Typography variant='h6' sx={{ margin: '1.5rem 0' }}>
				Based on {totalReviews} reviews
			</Typography>

			<Typography variant='h3'>{averageStars / 10}</Typography>
			<Typography sx={{ marginBottom: '1rem' }}>overall</Typography>

			<ReviewStarDistribution />
		</Grid>
	)
}

const ProductReview = () => {
	return (
		<Grid container spacing={5}>
			<ReviewResult />

			<Grid item xs={12} md={6}>
				<Typography variant='h6' sx={{ margin: '1.5rem 0' }}>
					Review “Powerbank 1130 mAh Blue”
				</Typography>
				<ProductReviewForm />
			</Grid>

			<Grid item xs={12}>
				<Typography variant='h4'>Customer Reviews</Typography>
				<ProductReviewList />{' '}
			</Grid>
		</Grid>
	)
}

export default ProductReview
