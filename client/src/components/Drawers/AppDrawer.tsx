import React from 'react'
import Box from '@material-ui/core/Box'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ListSubheader from '@material-ui/core/ListSubheader'
import { nanoid } from 'nanoid'

import MuiLink from 'components/Links/MuiLink'

import { useAppSelector } from 'redux/hooks/appHooks'
import { useGetMultipleProfile } from 'hooks/swr/useProfileHooks'

import { useGetAllCategoryNames } from 'hooks/swr/useProductHooks'

import { LOGIN_URL } from 'variables/global'

interface Props {
	open: boolean
	setOpen: Function
}

const AccountPart = () => {
	const { userID } = useAppSelector(state => state.user)

	const { data } = useGetMultipleProfile([userID])

	if (!data && !userID)
		return (
			<Grid container sx={{ padding: '16px' }}>
				<Grid item xs={12} sx={{ paddingBottom: '16px' }}>
					<Avatar
						sx={{ height: { xs: 100, md: 150 }, width: { xs: 100, md: 150 } }}
					/>
				</Grid>
				<Grid item container justifyContent='space-between'>
					<Grid item>
						<MuiLink MuiComponent={Typography} href={LOGIN_URL} variant='button'>
							login
						</MuiLink>
					</Grid>
				</Grid>
			</Grid>
		)

	if (!data) return null

	const {
		getMultipleProfile: [{ name, profilePicture }],
	} = data

	return (
		<Grid container sx={{ padding: '16px' }}>
			<Grid item xs={12} sx={{ paddingBottom: '16px' }}>
				<Avatar
					src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/q_100,ar_1.0,c_fill,h_200,w_200,g_face/r_max/${profilePicture}.webp`}
					sx={{ height: { xs: 100, md: 150 }, width: { xs: 100, md: 150 } }}
				/>
			</Grid>
			<Grid item xs={12} sx={{ paddingBottom: '16px' }}>
				<MuiLink MuiComponent={Typography} href='/account' variant='h5'>
					{name}
				</MuiLink>
			</Grid>
			<Grid item container justifyContent='space-between'>
				<Grid item>
					<MuiLink MuiComponent={Typography} href='/settings' variant='button'>
						Settings
					</MuiLink>
				</Grid>
				<Grid item>
					<MuiLink
						MuiComponent={Typography}
						href='/authentication/logout'
						variant='button'
					>
						Logout
					</MuiLink>
				</Grid>
			</Grid>
		</Grid>
	)
}

const CategoryList = () => {
	const { data } = useGetAllCategoryNames()

	if (!data) return null

	const { getAllCategoryNames: allCategoryNames } = data

	return (
		<>
			{allCategoryNames.map(({ name }) => (
				<ListItem
					button
					sx={{ pl: '40px', textTransform: 'capitalize' }}
					key={nanoid()}
				>
					<ListItemText primary={name} />
				</ListItem>
			))}
		</>
	)
}

const DrawerList = () => {
	return (
		<Box>
			<AccountPart />
			<List
				subheader={
					<>
						<ListSubheader component={Typography} id='nested-list-subheader'>
							Shop by Categories
						</ListSubheader>
					</>
				}
			>
				<CategoryList />
			</List>
		</Box>
	)
}

const AppDrawer = ({ open, setOpen }: Props) => {
	return (
		<div>
			<SwipeableDrawer
				open={open}
				onOpen={() => setOpen(true)}
				onClose={() => setOpen(false)}
				PaperProps={{
					sx: {
						width: { xs: '70vw', sm: '60vw', md: '50vw', xl: '20vw', lg: '40vw' },
					},
				}}
			>
				<DrawerList />
			</SwipeableDrawer>
		</div>
	)
}

export default AppDrawer
