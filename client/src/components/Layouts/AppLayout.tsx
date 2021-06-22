import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import TopNavigation from 'components/Navigations/TopNavigation'
import Footer from 'components/Footer/Footer'

const SearchBar = dynamic(() => import('./SearchBar'))
const BannerSlideShow = dynamic(
	() => import('components/Banner/BannerSlideShow')
)

interface Props {
	children: React.ReactNode
}

const AppLayout = ({ children }: Props) => {
	const [showSearchBar, setShowSearchBar] = useState(false)

	const { route } = useRouter()

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

				{route === '/' && <BannerSlideShow />}

				<Grid container justifyContent='center'>
					<Grid item xs={12} md={10}>
						{children}
					</Grid>
				</Grid>

				<Footer />
			</Paper>
		</>
	)
}

export default AppLayout
