import { useAppDispatch } from 'redux/hooks/appHooks'
import { setShippingAddress } from 'redux/slices/checkoutSlices'
import { Values } from 'components/Forms/BillingForms/ShippingForm'

const useSetShippingAddress = () => {
	const dispatch = useAppDispatch()

	return (values: Values) => dispatch(setShippingAddress(values))
}

export default useSetShippingAddress
