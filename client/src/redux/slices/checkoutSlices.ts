import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Values as ShippingValues } from 'components/Forms/BillingForms/ShippingForm'

interface InitialState {
	shippingValues: ShippingValues
	showDifferentAddressForm: boolean
}

const initialState: InitialState = {
	shippingValues: {
		name: '',
		country: '',
		address: '',
		city: '',
		postal: '',
	},
	showDifferentAddressForm: false,
}

export const checkoutSlice = createSlice({
	name: 'checkout',
	initialState,
	reducers: {
		setShippingAddress: (state, { payload }: PayloadAction<ShippingValues>) => {
			state.shippingValues = payload
		},
		clearShippingAddress: () => initialState,
		resetState: () => initialState,
		toggleShowDifferentAddressForm: state => {
			state.showDifferentAddressForm = !state.showDifferentAddressForm
		},
	},
})

export const {
	setShippingAddress,
	clearShippingAddress,
	toggleShowDifferentAddressForm,
	resetState,
} = checkoutSlice.actions

export default checkoutSlice.reducer
