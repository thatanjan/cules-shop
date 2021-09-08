import React from 'react'
import { GetServerSideProps } from 'next'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem'
import { nanoid } from 'nanoid'

import CheckIcon from '@material-ui/icons/Check'

import Register from 'components/Forms/AuthForms/Register'

const benefits = [
	'Speed your way through checkout',
	'Track your orders easily',
	'Keep a record of all your purchases',
]

const LoginPage = () => {
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

				<Typography variant='h5' sx={{ margin: '2rem 0 1rem' }}>
					Sign up today and you will be able to :
				</Typography>

				<List>
					{benefits.map(item => (
						<ListItem key={nanoid()}>
							<ListItemIcon>
								<CheckIcon />
							</ListItemIcon>
							<ListItemText primary={item} />
						</ListItem>
					))}
				</List>
			</Grid>
		</Grid>
	)
}

export default LoginPage

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const { cookies } = req

	if (!cookies.jwt) return { props: {} }
}
