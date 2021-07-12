import { login, Ids, logout } from 'redux/slices/userSlice'
import { useAppDispatch, useAppSelector } from 'redux/hooks/appHooks'

export const useStoreID = (ids: Ids) => {
	const dispatch = useAppDispatch()

	if (!ids.userID) return dispatch(logout())

	dispatch(login(ids))
}

export const useUserState = () => useAppSelector(state => state.user)
