import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { nanoid } from 'nanoid'

import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

import AccountAvatar from 'components/Avatar/AccountAvatar'
import MuiLink from 'components/Links/MuiLink'

import { useAppSelector } from 'redux/hooks/appHooks'
import { useGetMultipleProfile } from 'hooks/swr/useProfileHooks'

import { LOGIN_URL } from 'variables/global'

interface Props {
	open: boolean
	setOpen: Function
}

const data = {
	name: 'Computers',
	subCategories: ['laptop', 'desktop', 'monitor'],
}

const DrawerListItem = ({ name, subCategories }: typeof data) => {
	const [openNest, setOpenNest] = useState(false)
	return (
		<>
			<ListItem button onClick={() => setOpenNest(prev => !prev)}>
				<ListItemText primary={name} />
				{openNest ? <ExpandLess /> : <ExpandMore />}
			</ListItem>

			{openNest && (
				<Collapse in={openNest} timeout='auto' unmountOnExit>
					{subCategories &&
						subCategories.map(item => (
							<List component='div' disablePadding>
								<ListItem button sx={{ pl: 4 }}>
									<ListItemText primary={item} />
								</ListItem>
							</List>
						))}
				</Collapse>
			)}
		</>
	)
}

const AccountPart = () => {
	const { userID } = useAppSelector(state => state.user)

	const { data } = useGetMultipleProfile([userID])

	if (!data && !userID)
		return (
			<Grid container sx={{ padding: '16px' }}>
				<Grid item xs={12} sx={{ paddingBottom: '16px' }}>
					<AccountAvatar small src='' name='' />
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
				<AccountAvatar name={name} src={profilePicture} small />
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

const DrawerList = () => {
	return (
		<Box>
			<AccountPart />
			<List>
				{Array(10)
					.fill(data)
					.map((item: typeof data) => (
						<DrawerListItem {...item} key={nanoid()} />
					))}
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
