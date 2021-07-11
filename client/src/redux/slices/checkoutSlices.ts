import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Values as ShippingValues } from 'components/Forms/BillingForms/ShippingForm'

interface InitialState {
	shippingValues: ShippingValues
	showDifferentAddressForm: boolean
}

const initialState: InitialState = {
	shippingValues: {
		email: '',
		firstName: '',
		secondName: '',
		country: '',
		streetAddress1: '',
		streetAddress2: '',
		cityTown: '',
		state: '',
		zip: '',
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

console.log(checkoutSlice)

export const {
	setShippingAddress,
	clearShippingAddress,
	toggleShowDifferentAddressForm,
	resetState,
} = checkoutSlice.actions

export default checkoutSlice.reducer
