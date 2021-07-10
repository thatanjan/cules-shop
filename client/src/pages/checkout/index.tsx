import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

import { useClearShippingAddress } from 'redux/hooks/useCheckoutHooks'

import CheckoutForm from 'components/Forms/CheckoutForm'
import ShippingFormContainer from 'components/Forms/BillingForms/ShippingFormContainer'

interface Props {}

interface CheckoutPageTitleProps {
	children: React.ReactNode
}

export const CheckoutPageTitle = ({ children }: CheckoutPageTitleProps) => (
	<>
		<Typography variant='h4' color='secondary' sx={{ marginBottom: '1rem' }}>
			{children}
		</Typography>
		<Divider />
	</>
)

const CheckoutPage = (props: Props) => {
	const clearShippingAddress = useClearShippingAddress()

	useEffect(() => {
		return () => {
			clearShippingAddress()
		}
	}, [])

	return (
		<>
			<Typography
				align='center'
				variant='h3'
				component='h1'
				sx={{ marginBottom: '1rem' }}
				color='primary'
			>
				Checkout
			</Typography>

			<Grid container spacing={3}>
				<Grid item xs={12} md={6} sx={{ margin: '1rem 0' }}>
					<CheckoutPageTitle>Shipping Address</CheckoutPageTitle>

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

					<Grid item xs={12}>
						<ShippingFormContainer />
					</Grid>
				</Grid>

				<Grid item xs={12} md={6}>
					<CheckoutForm />
				</Grid>
			</Grid>
		</>
	)
}

export default CheckoutPage
