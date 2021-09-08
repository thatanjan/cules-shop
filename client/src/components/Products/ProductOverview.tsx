import Grid from '@material-ui/core/Grid'
import Image from 'next/image'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { nanoid } from 'nanoid'

import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import CompareIcon from '@material-ui/icons/Compare'

import ProductQuantity from './ProductQuantity'

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

				<List>
					{Array(5)
						.fill(0)
						.map((_, index) => (
							<ListItem key={nanoid()}>
								<Typography sx={{ marginRight: '1rem' }}>{index + 1}.</Typography>
								<ListItemText primary='I dont for now' />
							</ListItem>
						))}
				</List>

				<Typography variant='h3' sx={{ marginTop: '3rem' }}>
					$400
				</Typography>

				<ProductQuantity />

				<Button
					sx={{ textTransform: 'capitalize', marginTop: '2rem', padding: '0.8rem' }}
					variant='contained'
					startIcon={<AddShoppingCartIcon />}
					fullWidth
				>
					add to cart
				</Button>
			</Grid>
		</Grid>
	)
}

export default ProductOverview
