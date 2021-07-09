import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import drawerReducer from 'redux/slices/drawerSlice'
import checkoutReducer from 'redux/slices/checkoutSlices'

const store = configureStore({
	reducer: { drawer: drawerReducer, checkout: checkoutReducer },
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
