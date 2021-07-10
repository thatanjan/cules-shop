import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'

import ClearIcon from '@material-ui/icons/Clear'
import PersonIcon from '@material-ui/icons/Person'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import SearchIcon from '@material-ui/icons/Search'

import { APP_TITLE } from 'variables/global'
import MuiLink from 'components/Links/MuiLink'

import useLargerThanMD from 'hooks/mediaQueries/useLargerThanMD'

const Drawer = dynamic(() => import('components/Drawers/AppDrawer'))
const SearchBar = dynamic(() => import('./TopNavigationSearchBar'))

type CallBack = (val: boolean) => boolean

interface Props {
	showSearchBar: boolean
	setShowSearchBar: (callBack: CallBack) => void
}

const TopNavigation = ({ setShowSearchBar, showSearchBar }: Props) => {
	const [open, setOpen] = useState(false)
	const largerThanMD = useLargerThanMD()

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
								component='h1'
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

						<IconButton>
							<PersonIcon />
						</IconButton>

						<IconButton>
							<ShoppingCartIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
			</Box>
		</>
	)
}

export default TopNavigation
