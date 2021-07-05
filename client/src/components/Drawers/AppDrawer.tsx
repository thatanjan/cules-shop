import React, { useState, Fragment } from 'react'
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

const DrawerList = () => {
	const [openNest, setOpenNest] = useState(false)
	return (
		<Box>
			<List>
				{Array(10)
					.fill(data)
					.map(({ name, subCategories }) => (
						<Fragment key={nanoid()}>
							<ListItem button>
								<ListItemText
									primary={name}
									onClick={() => setOpenNest(prev => !prev)}
								/>
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
						</Fragment>
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
