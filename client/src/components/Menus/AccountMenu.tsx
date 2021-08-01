import React, { useState, ReactNode } from 'react'
import Menu from '@material-ui/core/Menu'
import MenuItem, { MenuItemProps } from '@material-ui/core/MenuItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Tooltip from '@material-ui/core/Tooltip'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import PersonAdd from '@material-ui/icons/PersonAdd'
import Settings from '@material-ui/icons/Settings'
import Logout from '@material-ui/icons/Logout'
import { useTheme } from '@material-ui/core/styles'

import AccountAvatar from 'components/Avatar/AccountAvatar'
import MuiLink from 'components/Links/MuiLink'

import { useAppSelector } from 'redux/hooks/appHooks'
import { useGetMultipleUserNameImage } from 'hooks/swr/useProfileHooks'

interface LinkedMenuProps extends MenuItemProps {
	children: ReactNode
	href: string
}

const LinkedMenu = ({ children, href, ...props }: LinkedMenuProps) => {
	return (
		<MuiLink MuiComponent={MenuItem} href={href} {...props}>
			{children}
		</MuiLink>
	)
}

const ForLoggedIn = () => {
	const { userID } = useAppSelector(state => state.user)

	const { data } = useGetMultipleUserNameImage([userID])

	if (!data) return null

	const {
		getMultipleUserNameImage: [{ name, profilePicture }],
	} = data

	return (
		<>
			<LinkedMenu sx={{ mb: 1 }} href='/account'>
				<ListItemIcon>
					<AccountAvatar name={name} src={profilePicture} small />
				</ListItemIcon>
				My account
			</LinkedMenu>
			<Divider />
			<LinkedMenu href='/settings'>
				<ListItemIcon>
					<Settings fontSize='small' />
				</ListItemIcon>
				Settings
			</LinkedMenu>
			<LinkedMenu href='/logout'>
				<ListItemIcon>
					<Logout fontSize='small' />
				</ListItemIcon>
				Logout
			</LinkedMenu>
		</>
	)
}

const LoggedInAvatar = () => {
	const { userID } = useAppSelector(state => state.user)

	const { data } = useGetMultipleUserNameImage([userID])

	if (!data) return null

	const {
		getMultipleUserNameImage: [{ name, profilePicture }],
	} = data

	return <AccountAvatar name={name} src={profilePicture} small />
}

const AccountMenu = () => {
	const theme = useTheme()
	const { loggedIn } = useAppSelector(state => state.user)

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

	const open = Boolean(anchorEl)

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleClose = () => {
		setAnchorEl(null)
	}

	return (
		<>
			<Tooltip title='Account settings'>
				<IconButton onClick={handleClick}>
					{loggedIn ? <LoggedInAvatar /> : <AccountAvatar name='' src='' small />}
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
				{loggedIn ? <ForLoggedIn /> : ''}
			</Menu>
		</>
	)
}

export default AccountMenu
