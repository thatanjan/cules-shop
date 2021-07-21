import dynamic from 'next/dynamic'
import Image from 'next/image'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'

import { CartProduct } from 'interfaces/cart'

const ProductQuantity = dynamic(() => import('./ProductQuantity'))
const DeleteFromCart = dynamic(() => import('components/Cart/DeleteFromCart'))

export interface Props extends CartProduct {
	twoColumn?: boolean
	cartPage?: boolean
}

const ProductPreview = ({
	twoColumn,
	cartPage,
	name,
	category,
	price,
	userQuantity,
	_id,
}: Props) => {
	return (
		<Card
			sx={{
				m: '1rem auto',
				width: '90%',
				display: twoColumn && 'flex',
			}}
		>
			<CardMedia
				sx={{
					width: '100%',
					padding: '0 1rem',
					m: 'auto',
					flexBasis: twoColumn && '30%',
				}}
			>
				<Image
					src='/products/product.png'
					width={1920}
					height={1080}
					layout='responsive'
				/>
			</CardMedia>

			<Box sx={{ flexGrow: 1 }}>
				<CardHeader
					title={name}
					subheader={category.name}
					subheaderTypographyProps={{
						color: 'secondary',
						variant: 'body2',
						component: 'h4',
					}}
					titleTypographyProps={{
						variant: 'body1',
						component: 'h3',
					}}
				/>
				<CardContent
					component={Grid}
					container
					alignItems='center'
					justifyContent='space-between'
				>
					<Grid item>
						<Typography component='h5' variant='subtitle1' color='secondary'>
							${`${price / 100}`}
						</Typography>
					</Grid>

					{cartPage && (
						<Grid item>
							<DeleteFromCart />
						</Grid>
					)}

					<Grid item>
						{cartPage ? (
							<ProductQuantity productID={_id} quantity={userQuantity} />
						) : (
							<IconButton>
								<AddShoppingCartIcon />
							</IconButton>
						)}
					</Grid>
				</CardContent>
			</Box>
		</Card>
	)
}

export default ProductPreview
