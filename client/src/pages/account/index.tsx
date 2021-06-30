import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

import AccountData from 'components/Account/AccountData'
import AccountAvatar from 'components/Avatar/AccountAvatar'

import MuiLink from 'components/Links/MuiLink'

interface Props {}

const AccountPage = (props: Props) => {
	return (
		<>
			<Grid
				container
				alignItems='center'
				sx={{
					justifyContent: { xs: 'center', sm: 'start' },
					maxWidth: '50rem',
					margin: '3rem 0',
				}}
			>
				<Grid item xs={6} sm={4}>
					<AccountAvatar />
				</Grid>

				<Grid item xs={12} sm={6} sx={{ marginTop: { xs: '1rem', sm: 0 } }}>
					<Typography variant='h2' component='h1' align='center'>
						Taylor swift
					</Typography>

					<Box sx={{ display: 'grid', placeItems: 'center', marginTop: '1rem' }}>
						<MuiLink MuiComponent={Button} href='/account/edit' variant='contained'>
							Edit Profile
						</MuiLink>
					</Box>
				</Grid>
			</Grid>

			<AccountData />
		</>
	)
}

export default AccountPage
