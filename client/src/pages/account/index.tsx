import React from 'react'
import jwtDecode from 'jwt-decode'
import { GetServerSideProps } from 'next'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

import { useStoreID } from 'redux/hooks/useUserHooks'

import checkValidJWT from 'utils/auth/checkValidJWT'

import { UserPayload } from 'interfaces/authentication'

import AccountData from 'components/Account/AccountData'
import AccountAvatar from 'components/Avatar/AccountAvatar'

import { useUserState } from 'redux/hooks/useUserHooks'

import MuiLink from 'components/Links/MuiLink'

interface Props {
	userID: string
	sellerID: string
}

const AccountPage = (props: Props) => {
	const { sellerID } = useUserState()

	useStoreID(props)

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

					<Box
						sx={{
							display: 'grid',
							placeItems: 'center',
							marginTop: '1rem',
							gridTemplateColumns: '1fr 1fr',
						}}
					>
						<MuiLink MuiComponent={Button} href='/account/edit' variant='contained'>
							Edit Profile
						</MuiLink>

						<MuiLink
							MuiComponent={Button}
							href={
								sellerID
									? `/account/seller-profile/${sellerID}`
									: '/account/become-seller'
							}
							variant='contained'
						>
							{sellerID ? 'Seller profile' : 'Become a seller'}
						</MuiLink>
					</Box>
				</Grid>
			</Grid>

			<AccountData />
		</>
	)
}

export default AccountPage

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const {
		cookies: { jwt },
	} = req

	let props = { userID: '', sellerID: '' }

	if (!jwt) return { props }

	const isValid = await checkValidJWT(jwt)

	const { userID, sellerID } = jwtDecode<UserPayload>(jwt)

	if (!isValid) return { props }

	props = { userID, sellerID: sellerID || '' }

	return { props }
}
