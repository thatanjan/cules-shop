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
			<Typography variant='h3' component='h2'>
				Shipping Details
			</Typography>
			<Divider />

			{differentAddress && <ShippingForm />}
		</>
	)
}

export default ShippingFormContainer
