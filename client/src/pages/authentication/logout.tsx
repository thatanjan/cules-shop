import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import cookie from 'js-cookie'

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

	useEffect(() => {
		setTimeout(() => {
			push('/')
		}, 3000)
	})

	return null
}

export default Logout
