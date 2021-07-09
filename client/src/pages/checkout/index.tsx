import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'

import CheckoutForm from 'components/Forms/CheckoutForm'
import ShippingFormContainer from 'components/Forms/BillingForms/ShippingFormContainer'

interface Props {}

const CheckoutPage = (props: Props) => {
	const [differentAddress, setDifferentAddress] = useState(false)
	return (
		<>
			<Typography align='center' variant='h3' component='h1'>
				Checkout
			</Typography>

			<Grid container>
				<Grid item xs={12} sx={{ margin: '1rem 0' }}>
					<Typography variant='h3' color='secondary' sx={{ marginBottom: '1rem' }}>
						Shipping Address
					</Typography>
					<Divider />

					<Grid container sx={{ margin: '1rem 0' }}>
						<Grid item xs={12} sx={{ marginBottom: '1rem' }}>
							<Typography variant='h5'>Current Address</Typography>
						</Grid>

						<Grid item xs={4}>
							name
						</Grid>
						<Grid item xs={2}>
							:
						</Grid>
						<Grid item xs={6}>
							Anjan Shomodder
						</Grid>
					</Grid>
				</Grid>

				<Grid item xs={12}>
					<FormGroup>
						<FormControlLabel
							control={
								<Checkbox
									onChange={event => setDifferentAddress(event.target.checked)}
								/>
							}
							label='Use different address'
						/>
					</FormGroup>
				</Grid>

				{differentAddress && (
					<Grid item xs={12}>
						<ShippingFormContainer />
					</Grid>
				)}

				<Grid item xs={12}>
					<CheckoutForm />
				</Grid>
			</Grid>
		</>
	)
}

export default CheckoutPage
