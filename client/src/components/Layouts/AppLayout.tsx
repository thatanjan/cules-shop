import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Box from '@material-ui/core/Box'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'

interface Props {
	children: React.ReactNode
}

const AppLayout = ({ children }: Props) => {
	return (
		<>
			<Box sx={{ flexGrow: 1 }}>
				<AppBar position='static' sx={{ background: 'none' }}>
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

			{children}
		</>
	)
}

export default AppLayout
