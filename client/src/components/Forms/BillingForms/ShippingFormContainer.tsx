import React from 'react'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import dynamic from 'next/dynamic'

import { useAppSelector } from 'redux/hooks/appHooks'

const ShippingForm = dynamic(() => import('./ShippingForm'))

interface Props {}

const ShippingFormContainer = (props: Props) => {
	const showDifferentAddressForm = useAppSelector(
		state => state.checkout.showDifferentAddressForm
	)
	return (
		<>
			<Typography variant='h4' component='h2' sx={{ margin: '1rem 0' }}>
				New Shipping Address
			</Typography>
			<Divider sx={{ marginBottom: '1rem' }} />

			{showDifferentAddressForm && <ShippingForm />}
		</>
	)
}

export default ShippingFormContainer
