import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import AccountAvatar from 'components/Avatar/AccountAvatar'

interface Props {}

const AccountPage = (props: Props) => {
	return (
		<>
			<Grid
				container
				alignItems='center'
				sx={{
					justifyContent: { xs: 'center', sm: 'start' },
					background: 'cyan',
					maxWidth: '50rem',
				}}
			>
				<Grid item xs={6} sm={4}>
					<AccountAvatar />
				</Grid>

				<Grid item xs={12} sm={6} sx={{ marginTop: { xs: '1rem', sm: 0 } }}>
					<Typography
						variant='h2'
						component='h1'
						align='center'
						sx={{ textAlign: { md: 'start' } }}
					>
						Taylor swift
					</Typography>
				</Grid>
			</Grid>
		</>
	)
}

export default AccountPage
