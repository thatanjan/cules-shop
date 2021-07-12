import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InitialState {
	loggedIn: boolean
	userID: string
	sellerID: string
}

export interface Ids {
	userID: string
	sellerID: string
}

const initialState: InitialState = { loggedIn: false, userID: '', sellerID: '' }

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, { payload: { userID, sellerID } }: PayloadAction<Ids>) => {
			state.loggedIn = true
			state.userID = userID
			state.sellerID = sellerID
		},
		logout: () => initialState,
	},
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer
