import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { nanoid } from 'nanoid'

interface TabPanelProps {
	children?: React.ReactNode
	index: number
	value: number
}

const tabNames = ['featured', 'on Sale', 'top rated']

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
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
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
			<TabPanel value={value} index={0}>
				Item One
			</TabPanel>
			<TabPanel value={value} index={1}>
				Item Two
			</TabPanel>
			<TabPanel value={value} index={2}>
				Item Three
			</TabPanel>
		</Box>
	)
}

export default ProductPreviewTabs
