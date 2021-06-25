import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Image from 'next/image'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'

import AddIcon from '@material-ui/icons/Add'
import RemoveIcon from '@material-ui/icons/Remove'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import CompareIcon from '@material-ui/icons/Compare'

const ProductOverview = () => {
	const [quantity, setQuantity] = useState(0)
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

				<Typography variant='h3' sx={{ marginTop: '3rem' }}>
					$400
				</Typography>

				<ButtonGroup
					sx={{ marginTop: '1rem', background: 'rgba(255, 255, 255, 0.09)' }}
				>
					<IconButton
						color='primary'
						component='span'
						onClick={() => setQuantity(prev => prev + 1)}
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
							},
						}}
					/>

					<IconButton
						color='primary'
						component='span'
						disabled={quantity <= 0}
						onClick={() => setQuantity(prev => prev - 1)}
					>
						<RemoveIcon />
					</IconButton>
				</ButtonGroup>
			</Grid>
		</Grid>
	)
}

export default ProductOverview
