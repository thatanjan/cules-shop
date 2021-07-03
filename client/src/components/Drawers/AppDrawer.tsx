import React from 'react'
import Box from '@material-ui/core/Box'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

import { nanoid } from 'nanoid'

interface Props {
	open: boolean
	setOpen: Function
}

const data = {
	name: 'Computers',
	subCategories: ['laptop', 'desktop', 'monitor'],
}

const DrawerList = () => {
	return (
		<Box>
			<List>
				{Array(10)
					.fill(data)
					.map(({ name }) => (
						<ListItem button key={nanoid()}>
							<ListItemText primary={name} />
						</ListItem>
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
			>
				<DrawerList />
			</SwipeableDrawer>
		</div>
	)
}

export default AppDrawer
