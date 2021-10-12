import React from 'react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
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

import { APP_TITLE } from 'variables/global'

import AccountMenu from 'components/Menus/AccountMenu'
import MuiLink from 'components/Links/MuiLink'

import { toggleDrawer } from 'redux/slices/drawerSlice'
import { useAppSelector, useAppDispatch } from 'redux/hooks/appHooks'
import { useUserState } from 'redux/hooks/useSliceHooks'

import useLargerThanMD from 'hooks/mediaQueries/useLargerThanMD'
import { useTotalCartItems } from 'hooks/swr/useCartHooks'

const Drawer = dynamic(() => import('components/Drawers/AppDrawer'))
const SearchBar = dynamic(() => import('./TopNavigationSearchBar'))

type CallBack = (val: boolean) => boolean

interface Props {
	showSearchBar: boolean
	setShowSearchBar: (callBack: CallBack) => void
}

const CartMenu = () => {
	const { push } = useRouter()
	const { data } = useTotalCartItems()

	let totalItems: string | number = '0'

	if (data) {
		totalItems = data.totalCartItems.totalItems || totalItems
	}

	return (
		<IconButton onClick={() => push('/cart')}>
			<Badge badgeContent={totalItems} color='error'>
				<ShoppingCartIcon />
			</Badge>
		</IconButton>
	)
}

const TopNavigation = ({ setShowSearchBar, showSearchBar }: Props) => {
	const open = useAppSelector(state => state.drawer.isOpen)
	const { userID } = useUserState()

	const dispatch = useAppDispatch()

	const largerThanMD = useLargerThanMD()

	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar>
					<Toolbar>
						<IconButton
							edge='start'
							color='inherit'
							aria-label='open drawer'
							sx={{ mr: 2 }}
							onClick={() => dispatch(toggleDrawer())}
						>
							<MenuIcon />
						</IconButton>

						{open && <Drawer />}

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

						{largerThanMD && <AccountMenu />}

						{userID && <CartMenu />}
					</Toolbar>
				</AppBar>
			</Box>
		</>
	)
}

export default TopNavigation
