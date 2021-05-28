import Image from 'next/image'
import { useTheme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded'

export default function MediaControlCard() {
	const theme = useTheme()

	return (
		<Card sx={{ display: 'flex', flexDirection: 'row-reverse', m: '1rem' }}>
			<Box sx={{ display: 'flex', flexDirection: 'column' }}>
				<CardContent sx={{ flex: '1 0 auto' }}>
					<Typography component='h1' variant='h5'>
						Catch the hottest deals
					</Typography>
					<Typography variant='subtitle1' color='text.secondary' component='span'>
						shop now
					</Typography>
					<IconButton
						aria-label='go-to-product'
						sx={{
							background: theme.palette.secondary.main,
							marginLeft: '0.5rem',
							padding: '8px',
						}}
					>
						<ArrowForwardIosRoundedIcon sx={{ height: 10, width: 10 }} />
					</IconButton>
				</CardContent>
			</Box>

			<CardMedia sx={{ width: '100%', padding: '0 1rem' }}>
				<Image
					src='/products/product.png'
					width={1920}
					height={1080}
					layout='responsive'
				/>
			</CardMedia>
		</Card>
	)
}
