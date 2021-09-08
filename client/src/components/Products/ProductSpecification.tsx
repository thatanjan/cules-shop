import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { nanoid } from 'nanoid'

const ProductSpecification = () => {
	return (
		<>
			<Typography variant='h4' sx={{ marginBottom: '1rem' }}>
				Technical Specifications
			</Typography>

			{Array(10)
				.fill(0)
				.map(() => (
					<Grid container justifyContent='center' key={nanoid()}>
						<Grid item xs={5}>
							Brand
						</Grid>
						<Grid item xs={5}>
							Apple
						</Grid>

						<Grid
							item
							xs={11}
							component='hr'
							sx={{ borderColor: 'divider', margin: '0.5rem  0' }}
						/>
					</Grid>
				))}
		</>
	)
}

export default ProductSpecification
