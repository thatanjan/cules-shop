import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Values as ShippingValues } from 'components/Forms/BillingForms/ShippingForm'

interface InitialState {
	shippingValues: ShippingValues
	showDifferentAddressForm: boolean
	isCurrentAddressValid: boolean
	isNewAddressValid: boolean
	checkoutDone: boolean
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
	isCurrentAddressValid: false,
	isNewAddressValid: false,
	checkoutDone: false,
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
		setIsNewAddressValid: (state, { payload }) => {
			state.isNewAddressValid = payload
		},
		setCheckoutDone: (state, { payload }: PayloadAction<boolean>) => {
			state.checkoutDone = payload
		},
	},
})

export const {
	setShippingAddress,
	clearShippingAddress,
	toggleShowDifferentAddressForm,
	resetState,
	setIsCurrentAddressValid,
	setIsNewAddressValid,
	setCheckoutDone,
} = checkoutSlice.actions

export default checkoutSlice.reducer
