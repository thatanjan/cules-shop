import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'
import { nanoid } from 'nanoid'

import ProductPreviewSlideShow from 'components/Products/ProductPreviewSlideShow'

interface TabPanelProps {
	children?: React.ReactNode
	index: number
	value: number
}

export const tabNames = ['featured', 'on Sale', 'top rated']

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && children}
		</div>
	)
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	}
}

const ProductPreviewTabs = () => {
	const [value, setValue] = React.useState(0)

	const handleChange = (_: React.SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}

	return (
		<Box sx={{ width: '100%' }}>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs value={value} onChange={handleChange}>
					{tabNames.map((tab, index) => (
						<Tab
							key={nanoid()}
							sx={{ textTransform: 'capitalize' }}
							label={tab}
							{...a11yProps(index)}
						/>
					))}
				</Tabs>
			</Box>

			{tabNames.map((_, index) => (
				<TabPanel {...{ value, index, key: nanoid() }}>
					<ProductPreviewSlideShow />
				</TabPanel>
			))}
		</Box>
	)
}

export default ProductPreviewTabs
