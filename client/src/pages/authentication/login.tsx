import React from 'react'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

import Login from 'components/Forms/AuthForms/Login'

interface Props {}

const LoginPage = (props: Props) => {
	return (
		<>
			<Typography variant='h3' sx={{ margin: '1rem 0' }}>
				Login
			</Typography>
			<Divider />

			<Typography>Welcome back! Sign in to your account. </Typography>

			<Login />
		</>
	)
}

export default Login
