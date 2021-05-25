import React from 'react'
import Paper from '@material-ui/core/Paper'

import TopNavigation from 'components/Navigations/TopNavigation'

interface Props {
	children: React.ReactNode
}

const AppLayout = ({ children }: Props) => {
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
				<TopNavigation />
				{children}
			</Paper>
		</>
	)
}

export default AppLayout
