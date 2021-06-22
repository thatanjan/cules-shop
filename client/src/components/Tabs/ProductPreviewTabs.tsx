import React from 'react'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from '@material-ui/core/Box'
import { nanoid } from 'nanoid'

import useLargerThanMD from 'hooks/mediaQueries/useLargerThanMD'

import ProductPreviewSlideShow from 'components/Products/ProductPreviewSlideShow'

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

interface Props {
	tabNames: Array<string>
}

const ProductPreviewTabs = ({ tabNames }: Props) => {
	const [value, setValue] = React.useState(0)

	const handleChange = (_: React.SyntheticEvent, newValue: number) => {
		setValue(newValue)
	}

	const largerThanMD = useLargerThanMD()

	return (
		<Box sx={{ width: '100%', padding: largerThanMD ? '0 4rem' : '' }}>
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
					<ProductPreviewSlideShow singleTab={tabNames.length === 1} />
				</TabPanel>
			))}
		</Box>
	)
}

export default ProductPreviewTabs
