import Image from 'next/image'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const ProductPreview = () => {
	return (
		<Card sx={{ m: '1rem auto', width: '90%' }}>
			<CardHeader
				title='Lenovo Lp2'
				subheader='Head Phones'
				subheaderTypographyProps={{
					color: 'secondary',
				}}
			/>
			<CardMedia sx={{ width: '100%', padding: '0 1rem', m: 'auto' }}>
				<Image
					src='/products/product.png'
					width={1920}
					height={1080}
					layout='responsive'
				/>
			</CardMedia>

			<CardContent>
				<Typography variant='h5' color='secondary'>
					$100
				</Typography>
			</CardContent>
		</Card>
	)
}

export default ProductPreview
