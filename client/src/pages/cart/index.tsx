import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import CartItemsShow from 'components/Cart/CartItemsShow'
import CartTotal from 'components/Cart/CartTotal'

interface Props {}

interface CustomButtonProps {
	children: React.ReactNode
}

const CustomButton = ({ children }: CustomButtonProps) => {
	return (
		<Grid item xs={12} sm={5} md={12} sx={{ marginBottom: '.5rem' }}>
			<Button variant='contained' fullWidth>
				{children}
			</Button>
		</Grid>
	)
}

const CartPage = (props: Props) => {
	return (
		<div>
			<Typography component='h1' variant='h3' align='center'>
				Cart
			</Typography>

			<CartItemsShow />

			<Grid container justifyContent='flex-end'>
				<Grid item xs={12} md={6}>
					<CartTotal />
				</Grid>
			</Grid>

			<Grid container>
				<Grid item container xs={12} md={6} justifyContent='space-between'>
					<CustomButton>Update Cart</CustomButton>
					<CustomButton>Procced to checkout</CustomButton>
				</Grid>
			</Grid>
		</div>
	)
}

export default CartPage
