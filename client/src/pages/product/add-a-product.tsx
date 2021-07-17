import React from 'react'
import Image from 'next/image'
import jwtDecode from 'jwt-decode'
import { GetServerSideProps } from 'next'
import Grid from '@material-ui/core/Grid'

import AddProductForm from 'components/Forms/Product/AddProductForm'

import { UserPayload } from 'interfaces/authentication'

import checkValidJWT from 'utils/auth/checkValidJWT'

import { useStoreID } from 'redux/hooks/useUserHooks'

interface Props {
	userID: string
	sellerID: string
}

const BecomeSeller = (props: Props) => {
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
					<Image
						src='/products/product.png'
						height='1080'
						width='1920'
						layout='responsive'
					/>
				</Grid>

				<AddProductForm />
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

	if (!sellerID)
		return { redirect: { destination: '/account', permanent: false } }

	props = { userID, sellerID: sellerID || '' }

	return { props }
}
