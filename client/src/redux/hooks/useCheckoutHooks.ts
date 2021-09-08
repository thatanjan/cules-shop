import { useAppDispatch, useAppSelector } from 'redux/hooks/appHooks'
import {
	setShippingAddress,
	clearShippingAddress,
	toggleShowDifferentAddressForm,
	setCheckoutDone,
	resetState,
} from 'redux/slices/checkoutSlices'
import { Values } from 'components/Forms/BillingForms/ShippingForm'

export const useSetShippingAddress = () => {
	const dispatch = useAppDispatch()

	return (values: Values) => dispatch(setShippingAddress(values))
}

export const useToggleShowDifferentAddressForm = () => {
	const dispatch = useAppDispatch()
	return () => dispatch(toggleShowDifferentAddressForm())
}

export const useClearShippingAddress = () => {
	const dispatch = useAppDispatch()
	return () => dispatch(clearShippingAddress())
}

export const useGetCheckoutState = () => useAppSelector(state => state.checkout)

export const useSetCheckoutDone = () => {
	const dispatch = useAppDispatch()
	return () => dispatch(setCheckoutDone(true))
}

export const useResetCheckoutState = () => {
	const dispatch = useAppDispatch()
	return () => dispatch(resetState())
}
