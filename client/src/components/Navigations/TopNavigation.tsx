import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

interface Props {}

const TopNavigation = (props: Props) => {
	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position='static' >
					<Toolbar>
						<IconButton
							edge='start'
							color='inherit'
							aria-label='open drawer'
							sx={{ mr: 2 }}
						>
							<MenuIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
			</Box>
		</>
	)
}

export default TopNavigation
