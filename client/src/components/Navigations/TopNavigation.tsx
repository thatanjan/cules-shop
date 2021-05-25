import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Typography from '@material-ui/core/Typography'

import { APP_TITLE } from 'variables/global'
import MuiLink from 'components/Links/MuiLink'

interface Props {}

const TopNavigation = (props: Props) => {
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
						>
							<MenuIcon />
						</IconButton>

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
					</Toolbar>
				</AppBar>
			</Box>
		</>
	)
}

export default TopNavigation
