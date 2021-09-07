import React from 'react'
import jwtDecode from 'jwt-decode'
import { GetServerSideProps } from 'next'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import AccountAvatar from 'components/Avatar/AccountAvatar'
import CustomBackdrop from 'components/Loaders/CustomBackdrop'
import BecomeSellerForm from 'components/Forms/Account/BecomeSellerForm'

import { UserPayload } from 'interfaces/authentication'

import checkValidJWT from 'utils/auth/checkValidJWT'

import { useStoreID } from 'redux/hooks/useUserHooks'

import { useUserState } from 'redux/hooks/useUserHooks'

import { useGetMultipleProfile } from 'hooks/swr/useProfileHooks'

interface Props {
	userID: string
	sellerID: string
}

const BecomeSeller = (props: Props) => {
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
					maxWidth: '50rem',
					margin: '3rem 0',
				}}
			>
				<Grid item xs={6} sm={4}>
					<AccountAvatar src={profilePicture} name={name} />
				</Grid>

				<Grid item xs={12} sm={6} sx={{ marginTop: { xs: '1rem', sm: 0 } }}>
					<Typography variant='h2' component='h1' align='center'>
						Taylor swift
					</Typography>
				</Grid>

				<BecomeSellerForm />
			</Grid>
		</>
	)
}

export default BecomeSeller

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const {
		cookies: { jwt },
	} = req

	let props = { userID: '', sellerID: '' }

	if (!jwt) return { props }

	const isValid = await checkValidJWT(jwt)

	if (!isValid) return { props }

	const { userID, sellerID } = jwtDecode<UserPayload>(jwt)

	if (sellerID)
		return { redirect: { destination: '/account', permanent: false } }

	props = { userID, sellerID: sellerID || '' }

	return { props }
}
