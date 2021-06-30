import React from 'react'
import Typography from '@material-ui/core/Typography'

import CartItemsShow from 'components/Cart/CartItemsShow'

interface Props {}

const CartPage = (props: Props) => {
	return (
		<div>
			<Typography component='h1' variant='h3' align='center'>
				Cart
			</Typography>

			<CartItemsShow />
		</div>
	)
}

export default CartPage
