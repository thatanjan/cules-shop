import { useAppSelector } from 'redux/hooks/appHooks'

export const useUserState = () => useAppSelector(state => state.user)

export const useProfileState = () => useAppSelector(state => state.profile)

export const useCheckoutState = () => useAppSelector(state => state.checkout)
