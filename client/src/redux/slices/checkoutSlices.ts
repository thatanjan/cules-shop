import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { Values as ShippingValues } from 'components/Forms/BillingForms/ShippingForm'

interface InitialState {
	shippingValues: ShippingValues
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
}

export const checkoutSlice = createSlice({
	name: 'checkout',
	initialState,
	reducers: {
		setShippingAddress: (state, { payload }: PayloadAction<ShippingValues>) => {
			state.shippingValues = payload
		},
		clearShippingAddress: () => initialState,
	},
})

export const { setShippingAddress, clearShippingAddress } =
	checkoutSlice.actions

export default checkoutSlice.reducer
