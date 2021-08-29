import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'

interface Props {}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	}
}

const AllSellerProducts = (props: Props) => {
	return (
		<>
			<Box sx={{ width: '100%' }}>
				<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
					<Tabs indicatorColor='primary' variant='scrollable' value={0}>
						<Tab
							{...a11yProps(0)}
							label='Products'
							sx={{ textTransform: 'capitalize' }}
						/>
					</Tabs>
				</Box>
				Hello world
			</Box>
		</>
	)
}

export default AllSellerProducts
