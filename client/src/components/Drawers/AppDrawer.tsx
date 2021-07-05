import React, { useState } from 'react'
import Box from '@material-ui/core/Box'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'

import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

import { nanoid } from 'nanoid'

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
								<ListItem button>
									<ListItemText primary={item} />
								</ListItem>
							</List>
						))}
				</Collapse>
			)}
		</>
	)
}

const DrawerList = () => {
	return (
		<Box>
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
