import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import AppAccordion from 'components/Accordions/AppAccordions/AppAccordion'
import TopNavigation from 'components/Navigations/TopNavigation'
import Footer from 'components/Footer/Footer'

import useLargerThanMD from 'hooks/mediaQueries/useLargerThanMD'

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

	const largerThanMD = useLargerThanMD()

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
					<Grid item xs={11} md={10} lg={9}>
						{children}
					</Grid>
				</Grid>

				<AppAccordion />

				{largerThanMD && <Footer />}
			</Paper>
		</>
	)
}

export default AppLayout
