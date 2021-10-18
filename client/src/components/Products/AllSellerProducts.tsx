import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'

import Image from 'next/image'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import MuiLink from 'components/Links/MuiLink'

import { useGetAllSellerProducts } from 'hooks/swr/useProductHooks'

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	}
}

export interface SingleProductProps {
	name: string
	image: string
	price: number
	_id: string
	category: {
		name: string
		_id: string
	}
}

const SingleProduct = ({
	name,
	image,
	price,
	_id,
	category,
}: SingleProductProps) => {
	const productPageLink = `/product/${_id}`

	return (
		<Card
			sx={{
				m: '1rem auto',
				width: '90%',
			}}
		>
			<MuiLink
				href={productPageLink}
				MuiComponent={CardMedia}
				sx={{
					width: '100%',
					m: 'auto',
				}}
			>
				<Image
					src={image}
					width={1}
					height={1}
					layout='responsive'
					quality={20}
					objectFit='cover'
				/>
			</MuiLink>

			<Box sx={{ flexGrow: 1 }}>
				<CardHeader
					title={
						<MuiLink MuiComponent={Typography} href={productPageLink}>
							{name}
						</MuiLink>
					}
					subheader={
						<MuiLink MuiComponent={Typography} href={productPageLink}>
							{category.name}
						</MuiLink>
					}
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
					sx={{ padding: '0 16px' }}
				>
					<Grid item xs={6}>
						<Typography component='h5' variant='subtitle1' color='secondary'>
							${`${price / 100}`}
						</Typography>
					</Grid>
				</CardContent>
			</Box>
		</Card>
	)
}

const AllSellerProducts = () => {
	const { data } = useGetAllSellerProducts()

	if (!data) return null

	const {
		getAllSellerProducts: { products },
	} = data

	return (
		<>
			<Box sx={{ width: '100%' }}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs indicatorColor='primary' variant='scrollable' value={0}>
						<Tab
							{...a11yProps(0)}
							label='Products'
							sx={{ textTransform: 'capitalize' }}
						/>
					</Tabs>
				</Box>
				<Grid container>
					{products.map(({ name, image, price, _id, category }) => (
						<Grid item xs={12} sm={4} md={3}>
							<SingleProduct
								{...{
									name,
									image,
									price,
									category: { name: category.name, _id: category._id },
									_id,
								}}
							/>
						</Grid>
					))}
				</Grid>
			</Box>
		</>
	)
}

export default AllSellerProducts
