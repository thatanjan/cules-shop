import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'

import useLargerThanMD from 'hooks/mediaQueries/useLargerThanMD'

import ProductPreviewSlideShow from '../Products/SingleCategoryProductPreviewSlideShow'

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	}
}

interface Props {
	tabName: string
}

const SingleCategoryTab = ({ tabName }: Props) => {
	const largerThanMD = useLargerThanMD()

	return (
		<Box sx={{ width: '100%', padding: largerThanMD ? '0 4rem' : '' }}>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs value={0}>
					<Tab label={tabName} {...a11yProps(0)} />
				</Tabs>
			</Box>

			<ProductPreviewSlideShow />
		</Box>
	)
}

export default SingleCategoryTab
