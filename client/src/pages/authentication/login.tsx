import React from 'react'
import { GetServerSideProps } from 'next'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'

import checkValidJWT from 'utils/auth/checkValidJWT'

import Login from 'components/Forms/AuthForms/Login'

const LoginPage = () => {
	return (
		<Grid container justifyContent='center'>
			<Grid item xs={10} sm={8} md={7} lg={6} xl={5}>
				<Typography variant='h3' sx={{ margin: '1rem 0' }}>
					Login
				</Typography>

				<Divider />

				<Typography sx={{ margin: '1rem 0' }}>
					Welcome back! Sign in to your account.{' '}
				</Typography>

				<Login />
			</Grid>
		</Grid>
	)
}

export default LoginPage

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const {
		cookies: { jwt },
	} = req

	if (!jwt) return { props: {} }

	const isValid = await checkValidJWT(jwt)

	if (isValid) return { redirect: { destination: '/', permanent: false } }

	return { props: {} }
}
