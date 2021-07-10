import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface InitialState {
	loggedIn: boolean
	userID: string
}

const initialState: InitialState = { loggedIn: false, userID: '' }

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, { payload }: PayloadAction<string>) => {
			state.loggedIn = true
			state.userID = payload
		},
	},
})

export const { login } = userSlice.actions

export default userSlice.reducer
