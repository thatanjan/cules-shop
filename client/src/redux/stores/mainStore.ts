import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import drawerReducer from 'redux/slices/drawerSlice'

const store = configureStore({
	reducer: { drawer: drawerReducer },
})

export default store

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>
