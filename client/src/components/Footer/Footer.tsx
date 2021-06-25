import React from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

export const FOOTER_HEIGHT = '15rem'

const Footer = () => {
	return (
		<Box
			sx={{
				padding: '3rem 0',
				height: FOOTER_HEIGHT,
				position: 'sticky',
				top: '100%',
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
	)
}

export default Footer
