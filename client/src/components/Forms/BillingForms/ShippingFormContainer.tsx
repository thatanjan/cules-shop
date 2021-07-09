import React, { useState } from 'react'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import dynamic from 'next/dynamic'

const ShippingForm = dynamic(() => import('./ShippingForm'))

interface Props {}

const ShippingFormContainer = (props: Props) => {
	const [differentAddress, setDifferent] = useState(true)
	return (
		<>
			<Typography variant='h4' component='h2' sx={{ margin: '1rem 0' }}>
				New Shipping Address
			</Typography>
			<Divider sx={{ marginBottom: '1rem' }} />

			{differentAddress && <ShippingForm />}
		</>
	)
}

export default ShippingFormContainer
