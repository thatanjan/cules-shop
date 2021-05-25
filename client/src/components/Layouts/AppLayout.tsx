import React from 'react'

import TopNavigation from 'components/Navigations/TopNavigation'

interface Props {
	children: React.ReactNode
}

const AppLayout = ({ children }: Props) => {
	return (
		<>
			<TopNavigation />
			{children}
		</>
	)
}

export default AppLayout
