import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import drawerReducer from 'redux/slices/drawerSlice'
import checkoutReducer from 'redux/slices/checkoutSlices'
import userReducer from 'redux/slices/userSlice'
import profileReducer from 'redux/slices/profileSlice'

import userAuthApi from 'redux/api/auth/userAuth'

const store = configureStore({
	reducer: {
		drawer: drawerReducer,
		checkout: checkoutReducer,
		user: userReducer,
		profile: profileReducer,
		[userAuthApi.reducerPath]: userAuthApi.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(userAuthApi.middleware),
})

setupListeners(store.dispatch)

export default store

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>
