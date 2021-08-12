import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Values as ShippingValues } from 'components/Forms/BillingForms/ShippingForm'

interface InitialState {
	shippingValues: ShippingValues
	showDifferentAddressForm: boolean
	isCurrentAddressValid: boolean
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
	isCurrentAddressValid: true,
}

export const checkoutSlice = createSlice({
	name: 'checkout',
	initialState,
	reducers: {
		setShippingAddress: (state, { payload }: PayloadAction<ShippingValues>) => {
			state.shippingValues = payload
		},
		clearShippingAddress: state => {
			state.shippingValues = initialState.shippingValues
		},
		resetState: () => initialState,
		toggleShowDifferentAddressForm: state => {
			state.showDifferentAddressForm = !state.showDifferentAddressForm
		},
		setIsCurrentAddressValid: (state, { payload }) => {
			state.isCurrentAddressValid = payload
		},
	},
})

export const {
	setShippingAddress,
	clearShippingAddress,
	toggleShowDifferentAddressForm,
	resetState,
	setIsCurrentAddressValid,
} = checkoutSlice.actions

export default checkoutSlice.reducer
