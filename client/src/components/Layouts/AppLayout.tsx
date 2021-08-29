import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import { makeStyles, Theme } from '@material-ui/styles'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'

import TopNavigation from 'components/Navigations/TopNavigation'
import Footer from 'components/Footer/Footer'

import useLargerThanMD from 'hooks/mediaQueries/useLargerThanMD'

const SearchBar = dynamic(() => import('./SearchBar'))
const BannerSlideShow = dynamic(
	() => import('components/Banner/BannerSlideShow')
)

const useStyles = makeStyles((theme: Theme) => ({
	contentContainerStyle: {
		[theme.breakpoints.up('xs')]: {
			paddingTop:
				theme.mixins.toolbar['@media (min-width:0px) and (orientation: landscape)']
					.minHeight,
		},
		[theme.breakpoints.up('xs')]: {
			paddingTop: theme.mixins.toolbar.minHeight,
		},
		[theme.breakpoints.up('sm')]: {
			paddingTop: theme.mixins.toolbar['@media (min-width:600px)'].minHeight,
		},
	},
}))

interface Props {
	children: React.ReactNode
}

const AppLayout = ({ children }: Props) => {
	const [showSearchBar, setShowSearchBar] = useState(false)
	const largerThanMD = useLargerThanMD()
	const { contentContainerStyle } = useStyles()

	const { route } = useRouter()

	return (
		<>
			<Paper
				sx={{
					minHeight: '100vh',
					maxWidth: '100vw',
					overflowX: 'hidden',
				}}
				elevation={0}
				square
			>
				<TopNavigation {...{ setShowSearchBar, showSearchBar }} />

				{showSearchBar && !largerThanMD && <SearchBar />}

				{route === '/' && <BannerSlideShow />}

				<Grid container justifyContent='center' className={contentContainerStyle}>
					<Grid item xs={11} md={10} lg={9}>
						{children}
					</Grid>
				</Grid>

				<Footer />
			</Paper>
		</>
	)
}

export default AppLayout
