import { createSlice } from '@reduxjs/toolkit'

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

export const drawerSlice = createSlice({
	name: 'drawer',
	initialState,
	reducers: {},
})

export const {} = drawerSlice.actions

export default drawerSlice.reducer
