import React from 'react'
import Grid from '@material-ui/core/Grid'
import Image from 'next/image'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'

import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import CompareIcon from '@material-ui/icons/Compare'

const ProductOverview = () => {
	return (
		<Grid container>
			<Grid item xs={12}>
				<Image
					src='/products/product.png'
					layout='responsive'
					width={1920}
					height={1080}
				/>
			</Grid>

			<Grid item xs={12}>
				<Typography sx={{ color: '#9c9c9c' }}>Headphones</Typography>
				<Typography
					variant='h4'
					component='h1'
					sx={{ textTransform: 'capitalize' }}
				>
					Purple solo 2 wireless
				</Typography>

				<Box sx={{ marginTop: '1rem' }}>
					<Typography sx={{ display: 'inline' }}>Availability: </Typography>
					<Typography sx={{ display: 'inline' }} color='limegreen'>
						100 in strock
					</Typography>
				</Box>

				<hr style={{ color: '#6f6f6f' }} />

				<Box sx={{ marginTop: '2rem' }}>
					<Button
						variant='contained'
						startIcon={<FavoriteBorderIcon fontSize='small' />}
						size='small'
					>
						Wishlist
					</Button>

					<Button
						variant='contained'
						startIcon={<CompareIcon fontSize='small' />}
						size='small'
						sx={{ marginLeft: '1rem' }}
					>
						Compare
					</Button>
				</Box>
			</Grid>
		</Grid>
	)
}

export default ProductOverview
