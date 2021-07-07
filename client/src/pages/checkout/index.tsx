import React from 'react'
import Grid from '@material-ui/core/Grid'

import CheckoutForm from 'components/Forms/CheckoutForm'

interface Props {}

const CheckoutPage = (props: Props) => {
	return (
		<>
			<Grid container>
				<Grid item xs={12}>
					<CheckoutForm />
				</Grid>
			</Grid>
		</>
	)
}

export default CheckoutPage
