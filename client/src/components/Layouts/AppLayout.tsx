import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import dynamic from 'next/dynamic'

import TopNavigation from 'components/Navigations/TopNavigation'
import Footer from 'components/Footer/Footer'

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
				<TopNavigation {...{ setShowSearchBar, showSearchBar }} />

				{showSearchBar && <SearchBar {...{ mounted: showSearchBar }} />}

				{children}

				<Footer />
			</Paper>
		</>
	)
}

export default AppLayout
