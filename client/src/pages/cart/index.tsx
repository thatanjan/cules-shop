import React from 'react'
import dynamic from 'next/dynamic'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import CustomBackdrop from 'components/Loaders/CustomBackdrop'

import { useGetAllCartProducts } from 'hooks/swr/useCartHooks'

const CartItemsShow = dynamic(() => import('components/Cart/CartItemsShow'))
const CartTotal = dynamic(() => import('components/Cart/CartTotal'))
const CoupnInput = dynamic(() => import('components/Cart/CoupnInput'))

interface Props {}

interface CustomButtonProps {
	children: React.ReactNode
}

const CustomButton = ({ children }: CustomButtonProps) => {
	return (
		<Grid
			item
			xs={12}
			sm={5}
			sx={{ marginBottom: '.5rem', marginLeft: { sm: '1rem' } }}
		>
			<Button variant='contained' fullWidth>
				{children}
			</Button>
		</Grid>
	)
}

const CartPage = (props: Props) => {
	const { data } = useGetAllCartProducts()

	if (!data) return <CustomBackdrop />

	const {
		getAllCartProducts: { cartProducts },
	} = data

	return (
		<div>
			{cartProducts.length > 0 ? (
				<>
					<Typography component='h1' variant='h3' align='center'>
						Cart
					</Typography>
					<CartItemsShow cartProducts={cartProducts} />

					<Grid container sx={{ marginTop: '1rem' }}>
						<Grid item xs={12} md={8} lg={6} sx={{ maxWidth: '50rem' }}>
							<CoupnInput />
						</Grid>
						<Grid
							item
							container
							xs={12}
							lg={6}
							justifyContent='flex-end'
							alignItems='center'
						>
							<CustomButton>Update Cart</CustomButton>
							<CustomButton>Procced to checkout</CustomButton>
						</Grid>
					</Grid>

					<Grid container justifyContent='flex-end'>
						<Grid item xs={12} md={6}>
							<CartTotal />
						</Grid>
					</Grid>
				</>
			) : (
				<Grid
					container
					justifyContent='center'
					alignItems='center'
					sx={{ height: '100vh' }}
				>
					<Grid item>
						<Typography variant='h3' align='center'>
							No products in the Cart
						</Typography>
					</Grid>
				</Grid>
			)}
		</div>
	)
}

export default CartPage
