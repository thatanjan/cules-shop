import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'

import ClearIcon from '@material-ui/icons/Clear'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import SearchIcon from '@material-ui/icons/Search'

import { APP_TITLE, LOGIN_URL } from 'variables/global'

import AccountMenu from 'components/Menus/AccountMenu'
import MuiLink from 'components/Links/MuiLink'

import { useAppSelector } from 'redux/hooks/appHooks'
import useLargerThanMD from 'hooks/mediaQueries/useLargerThanMD'

const Drawer = dynamic(() => import('components/Drawers/AppDrawer'))
const SearchBar = dynamic(() => import('./TopNavigationSearchBar'))

type CallBack = (val: boolean) => boolean

interface Props {
	showSearchBar: boolean
	setShowSearchBar: (callBack: CallBack) => void
}

const CartMenu = () => {
	return (
		<IconButton>
			<Badge badgeContent={2} color='error'>
				<ShoppingCartIcon />
			</Badge>
		</IconButton>
	)
}

const TopNavigation = ({ setShowSearchBar, showSearchBar }: Props) => {
	const [open, setOpen] = useState(false)
	const largerThanMD = useLargerThanMD()

	const { loggedIn, userID } = useAppSelector(state => state.user)

	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position='static'>
					<Toolbar>
						<IconButton
							edge='start'
							color='inherit'
							aria-label='open drawer'
							sx={{ mr: 2 }}
							onClick={() => setOpen(prev => !prev)}
						>
							<MenuIcon />
						</IconButton>

						{open && <Drawer {...{ open, setOpen }} />}

						<Box sx={{ flexGrow: 1 }}>
							<MuiLink
								MuiComponent={Typography}
								href='/'
								sx={{ display: 'inline' }}
								variant='h5'
							>
								{APP_TITLE}
							</MuiLink>
						</Box>

						{!largerThanMD && (
							<IconButton onClick={() => setShowSearchBar((prev: boolean) => !prev)}>
								{showSearchBar ? <ClearIcon /> : <SearchIcon />}
							</IconButton>
						)}

						{largerThanMD && <SearchBar />}

						<AccountMenu />

						<CartMenu />
					</Toolbar>
				</AppBar>
			</Box>
		</>
	)
}

export default TopNavigation
