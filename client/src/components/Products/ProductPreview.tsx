import Image from 'next/image'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

const ProductPreview = () => {
	return (
		<Card
			sx={{
				m: '1rem auto',
				width: '90%',
				display: 'grid',
				gridTemplateColumns: 'repeat(2, 1fr)',
			}}
		>
			<CardMedia sx={{ width: '100%', padding: '0 1rem', m: 'auto' }}>
				<Image
					src='/products/product.png'
					width={1920}
					height={1080}
					layout='responsive'
				/>
			</CardMedia>

			<Box>
				<CardHeader
					title='Lenovo Lp2'
					subheader='Head Phones'
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
				<CardContent>
					<Typography component='h5' variant='subtitle2' color='secondary'>
						$100
					</Typography>
				</CardContent>
			</Box>
		</Card>
	)
}

export default ProductPreview
