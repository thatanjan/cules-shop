import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const ProductReview = () => {
	return (
		<Grid container>
			<Grid item xs={12}>
				<Typography variant='h6' sx={{ margin: '1.5rem 0' }}>
					Based on X reviews
				</Typography>

				<Typography variant='h3'>0.0</Typography>
				<Typography sx={{ marginBottom: '1rem' }}>overall</Typography>
			</Grid>

			<Grid item xs={12}>
				<Typography>Be the first to review “Powerbank 1130 mAh Blue”</Typography>
			</Grid>
		</Grid>
	)
}

export default ProductReview
