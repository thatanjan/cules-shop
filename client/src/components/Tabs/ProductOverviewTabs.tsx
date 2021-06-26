import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'
import { nanoid } from 'nanoid'
import { useTheme } from '@material-ui/core/styles'

import ProductSpecification from 'components/Products/ProductSpecification'

interface TabPanelProps {
	children?: React.ReactNode
	index: number
	value: number
}

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

const tabNames = ['Accessories', 'Description', 'specification', 'reviews']

const tabChildrens = [null, null, ProductSpecification]

const ProductOverviewTabs = () => {
	const [value, setValue] = React.useState(0)
	const theme = useTheme()

	const handleChange = (_: React.SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}

	return (
		<Box sx={{ width: '100%' }}>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs value={value} onChange={handleChange} indicatorColor='primary'>
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

			{tabNames.map((_, index) => {
				const TabChildren = tabChildrens[index]
				return (
					<TabPanel {...{ value, index, key: nanoid() }}>
						<Box
							sx={{
								border: `1px solid ${theme.palette.primary.main}`,
								borderRadius: '0.5rem',
								padding: '1rem',
							}}
						>
							{TabChildren && <TabChildren />}
						</Box>
					</TabPanel>
				)
			})}
		</Box>
	)
}

export default ProductOverviewTabs
