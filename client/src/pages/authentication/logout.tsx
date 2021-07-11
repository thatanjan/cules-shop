import { resetState as resetCheckoutState } from 'redux/slices/checkoutSlices'
import { logout } from 'redux/slices/userSlice'
import { resetState as resetDrawerState } from 'redux/slices/drawerSlice'
import { useAppDispatch } from 'redux/hooks/appHooks'

interface Props {}

const Logout = (props: Props) => {
	const dispatch = useAppDispatch()

	dispatch(logout())
	dispatch(resetCheckoutState())
	dispatch(resetDrawerState())

	return null
}

export default Logout
