import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import CheckoutForm from 'components/Forms/CheckoutForm'

interface Props {}

const CheckoutPage = (props: Props) => {
	return (
		<>
			<Typography align='center' variant='h3' component='h1'>
				Checkout
			</Typography>

			<Grid container>
				<Grid item xs={12}>
					<CheckoutForm />
				</Grid>
			</Grid>
		</>
	)
}

export default CheckoutPage
