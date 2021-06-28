import React from 'react'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'

import Register from 'components/Forms/AuthForms/Register'

interface Props {}

const LoginPage = (props: Props) => {
	return (
		<Grid container justifyContent='center'>
			<Grid item xs={10} sm={8} md={7} lg={6} xl={5}>
				<Typography variant='h3' sx={{ margin: '1rem 0' }}>
					Register
				</Typography>

				<Divider />

				<Typography sx={{ margin: '1rem 0' }}>
					Create new account today to reap the benefits of a personalized shopping
					experience.
				</Typography>

				<Register />
			</Grid>
		</Grid>
	)
}

export default LoginPage
