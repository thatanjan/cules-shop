import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import cookie from 'js-cookie'
import { cache } from 'swr'

import { TOKEN_NAME } from 'variables/global'

import { resetState as resetCheckoutState } from 'redux/slices/checkoutSlices'
import { logout } from 'redux/slices/userSlice'
import { resetState as resetDrawerState } from 'redux/slices/drawerSlice'
import { useAppDispatch } from 'redux/hooks/appHooks'

interface Props {}

const Logout = (props: Props) => {
	const dispatch = useAppDispatch()

	const { push } = useRouter()

	dispatch(logout())
	dispatch(resetCheckoutState())
	dispatch(resetDrawerState())

	cookie.remove(TOKEN_NAME)
	cache.clear()

	useEffect(() => {
		setTimeout(() => {
			push('/')
		}, 3000)
	})

	return (
		<Box sx={{ display: 'grid', height: '100vh', placeItems: 'center' }}>
			<Typography variant='h2'>We are logging you out</Typography>
		</Box>
	)
}

export default Logout
