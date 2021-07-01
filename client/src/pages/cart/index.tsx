import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import CartItemsShow from 'components/Cart/CartItemsShow'
import CartTotal from 'components/Cart/CartTotal'

interface Props {}

const CartPage = (props: Props) => {
	return (
		<div>
			<Typography component='h1' variant='h3' align='center'>
				Cart
			</Typography>

			<CartItemsShow />

			<Grid container>
				<Grid item xs={12}>
					<CartTotal />
				</Grid>
			</Grid>
		</div>
	)
}

export default CartPage
