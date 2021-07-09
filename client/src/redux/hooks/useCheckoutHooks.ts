import { useAppDispatch } from 'redux/hooks/appHooks'
import {
	setShippingAddress,
	clearShippingAddress,
	toggleShowDifferentAddressForm,
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
