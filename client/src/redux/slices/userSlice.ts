import { createSlice } from '@reduxjs/toolkit'

interface InitialState {
	loggedIn: boolean
	userID: string
}

const initialState: InitialState = { loggedIn: false, userID: '' }

export const userSlice = createSlice({
	name: 'drawer',
	initialState,
	reducers: {},
})

export const {} = userSlice.actions

export default userSlice.reducer
