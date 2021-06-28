import React from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

import useLargerThanMD from 'hooks/mediaQueries/useLargerThanMD'
import AppAccordion from 'components/Accordions/AppAccordions/AppAccordion'

export const FOOTER_HEIGHT = '15rem'

const Footer = () => {
	const largerThanMD = useLargerThanMD()

	return (
		<Box
			sx={{
				position: 'sticky',
				top: '100%',
			}}
			component='footer'
		>
			{!largerThanMD && <AppAccordion />}

			<Box
				sx={{
					padding: '3rem 0',
					height: FOOTER_HEIGHT,
					display: 'grid',
					placeItems: 'center',
				}}
			>
				<Typography
					variant='h2'
					align='center'
					color='primary'
					sx={{ fontWeight: 500 }}
				>
					Cules Shop
				</Typography>
			</Box>
		</Box>
	)
}

export default Footer
