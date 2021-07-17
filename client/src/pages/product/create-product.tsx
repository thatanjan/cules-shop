import React from 'react'
import Image from 'next/image'
import jwtDecode from 'jwt-decode'
import { GetServerSideProps } from 'next'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import CreateProductForm from 'components/Forms/Product/CreateProductForm'

import { UserPayload } from 'interfaces/authentication'

import checkValidJWT from 'utils/auth/checkValidJWT'

import { useStoreID } from 'redux/hooks/useUserHooks'

interface Props {
	userID: string
	sellerID: string
}

const CreateProduct = (props: Props) => {
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

					<Button variant='contained' sx={{ margin: '1rem 0' }}>
						Upload a Image
					</Button>
				</Grid>

				<CreateProductForm />
			</Grid>
		</>
	)
}

export default CreateProduct

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
