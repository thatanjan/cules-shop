import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import dynamic from 'next/dynamic'

import TopNavigation from 'components/Navigations/TopNavigation'

const SearchBar = dynamic(() => import('./SearchBar'))

interface Props {
	children: React.ReactNode
}

const AppLayout = ({ children }: Props) => {
	const [showSearchBar, setShowSearchBar] = useState(false)

	return (
		<>
			<Paper
				sx={{
					minHeight: '100vh',
					maxWidth: '100vw',
					minWidth: '100vw',
				}}
				elevation={0}
				square
			>
				<TopNavigation {...{ setShowSearchBar }} />

				{showSearchBar && <SearchBar {...{ mounted: showSearchBar }} />}

				{children}
			</Paper>
		</>
	)
}

export default AppLayout
