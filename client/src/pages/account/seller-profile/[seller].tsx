import React from 'react'
import jwtDecode from 'jwt-decode'
import { GetServerSideProps } from 'next'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

import { useStoreID, useUserState } from 'redux/hooks/useUserHooks'

import checkValidJWT from 'utils/auth/checkValidJWT'

import { LOGIN_URL } from 'variables/global'

import { UserPayload } from 'interfaces/authentication'

import AccountAvatar from 'components/Avatar/AccountAvatar'
import CustomBackdrop from 'components/Loaders/CustomBackdrop'

import { useGetMultipleProfile } from 'hooks/swr/useProfileHooks'

import MuiLink from 'components/Links/MuiLink'
import AllSellerProducts from 'components/Products/AllSellerProducts'

interface Props {
	userID: string
	sellerID: string
}

const AccountPage = (props: Props) => {
	useStoreID(props)

	const { userID } = useUserState()

	const { data } = useGetMultipleProfile([userID])

	if (!data) return <CustomBackdrop />

	const {
		getMultipleProfile: [{ name, profilePicture }],
	} = data

	return (
		<>
			<Grid
				container
				alignItems='center'
				sx={{
					justifyContent: { xs: 'center', sm: 'start' },
					maxWidth: '40rem',
					margin: '3rem 0',
				}}
			>
				<Grid item xs={6} sm={4}>
					<AccountAvatar src={profilePicture} name={name} />
				</Grid>

				<Grid item xs={12} sm={8} sx={{ marginTop: { xs: '1rem', sm: 0 } }}>
					<Typography variant='h2' component='h1' align='center'>
						{name}
					</Typography>

					<Box
						sx={{
							display: 'grid',
							placeItems: 'center',
							marginTop: '1rem',
							gridTemplateColumns: { sm: '1fr 1fr', xs: '1fr' },
						}}
					>
						<MuiLink MuiComponent={Button} href='/account' variant='contained'>
							Visit Profile
						</MuiLink>
						<MuiLink
							MuiComponent={Button}
							href='/product/create-product'
							variant='contained'
							sx={{ textAlign: 'center', marginTop: { xs: '1rem', sm: '0' } }}
						>
							Create a new product
						</MuiLink>
					</Box>
				</Grid>
			</Grid>
			<AllSellerProducts />
		</>
	)
}

export default AccountPage

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const {
		cookies: { jwt },
	} = req

	let props = { userID: '', sellerID: '' }

	if (!jwt)
		return { props, redirect: { destination: LOGIN_URL, permanent: false } }

	const isValid = await checkValidJWT(jwt)

	const { userID, sellerID } = jwtDecode<UserPayload>(jwt)

	if (!sellerID && !isValid)
		return { props, redirect: { destination: LOGIN_URL, permanent: false } }

	props = { userID, sellerID }

	return { props }
}
