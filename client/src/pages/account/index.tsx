import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import AccountAvatar from 'components/Avatar/AccountAvatar'

interface Props {}

const AccountPage = (props: Props) => {
	return (
		<>
			<Grid container justifyContent='center' alignItems='center'>
				<Grid item xs={6} sm={5} md={4} lg={3} xl={2}>
					<AccountAvatar />
				</Grid>

				<Grid item xs={12} sm={6} sx={{ marginTop: { xs: '1rem', sm: 0 } }}>
					<Typography variant='h2' component='h1' align='center'>
						Taylor swift
					</Typography>
				</Grid>
			</Grid>
		</>
	)
}

export default AccountPage
