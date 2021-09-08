import { createSlice } from '@reduxjs/toolkit'

export const drawerSlice = createSlice({
	name: 'drawer',
	initialState: {
		isOpen: false,
	},
	reducers: {
		toggleDrawer: state => {
			state.isOpen = !state.isOpen
		},
		resetState: state => {
			state.isOpen = false
		},
	},
})

export const { toggleDrawer, resetState } = drawerSlice.actions

export default drawerSlice.reducer
