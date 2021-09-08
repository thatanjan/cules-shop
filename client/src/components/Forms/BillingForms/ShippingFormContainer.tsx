import React from 'react'
import Divider from '@material-ui/core/Divider'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import dynamic from 'next/dynamic'

import { CheckoutPageTitle } from 'pages/checkout/index'

import { useAppSelector } from 'redux/hooks/appHooks'
import { useToggleShowDifferentAddressForm } from 'redux/hooks/useCheckoutHooks'

const ShippingForm = dynamic(() => import('./ShippingForm'))

const ShippingFormContainer = () => {
	const showDifferentAddressForm = useAppSelector(
		state => state.checkout.showDifferentAddressForm
	)

	const toggleShowDifferentAddressForm = useToggleShowDifferentAddressForm()

	return (
		<>
			<CheckoutPageTitle>New Shipping Address</CheckoutPageTitle>

			<FormGroup>
				<FormControlLabel
					control={<Checkbox onChange={toggleShowDifferentAddressForm} />}
					label='Use different address'
				/>
			</FormGroup>

			<Divider sx={{ marginBottom: '1rem' }} />

			{showDifferentAddressForm && <ShippingForm />}
		</>
	)
}

export default ShippingFormContainer
