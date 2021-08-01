import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Tooltip from '@material-ui/core/Tooltip'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import PersonAdd from '@material-ui/icons/PersonAdd'
import Settings from '@material-ui/icons/Settings'
import Logout from '@material-ui/icons/Logout'
import { useTheme } from '@material-ui/core/styles'

import AccountAvatar from 'components/Avatar/AccountAvatar'

import { useAppSelector } from 'redux/hooks/appHooks'
import { useGetMultipleUserNameImage } from 'hooks/swr/useProfileHooks'

const AccountMenu = () => {
	const theme = useTheme()
	const { loggedIn, userID } = useAppSelector(state => state.user)

	const { data } = useGetMultipleUserNameImage([userID])

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

	if (!data) return null

	const open = Boolean(anchorEl)

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	const {
		getMultipleUserNameImage: [{ name, profilePicture }],
	} = data

	return (
		<>
			<Tooltip title='Account settings'>
				<IconButton onClick={handleClick}>
					<AccountAvatar name={name} src={profilePicture} small />
				</IconButton>
			</Tooltip>

			<Menu
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				onClick={handleClose}
				PaperProps={{
					elevation: 0,
					sx: {
						overflow: 'visible',
						filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
						mt: 1.5,
						'& .MuiAvatar-root': {
							width: 32,
							height: 32,
							ml: -0.5,
							mr: 1,
						},
						'&:before': {
							content: '""',
							display: 'block',
							position: 'absolute',
							top: 0,
							right: 14,
							width: 10,
							height: 10,
							bgcolor: theme.palette.background.paper,
							transform: 'translateY(-50%) rotate(45deg)',
							zIndex: 0,
						},
					},
				}}
				transformOrigin={{ horizontal: 'right', vertical: 'top' }}
				anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
			>
				<MenuItem sx={{ mb: 1 }}>
					<ListItemIcon>
						<AccountAvatar name={name} src={profilePicture} small />
					</ListItemIcon>
					My account
				</MenuItem>
				<Divider />
				<MenuItem>
					<ListItemIcon>
						<PersonAdd fontSize='small' />
					</ListItemIcon>
					Add another account
				</MenuItem>
				<MenuItem>
					<ListItemIcon>
						<Settings fontSize='small' />
					</ListItemIcon>
					Settings
				</MenuItem>
				<MenuItem>
					<ListItemIcon>
						<Logout fontSize='small' />
					</ListItemIcon>
					Logout
				</MenuItem>
			</Menu>
		</>
	)
}

export default AccountMenu
