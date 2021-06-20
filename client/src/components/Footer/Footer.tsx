import React from 'react'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'

const Footer = () => {
	return (
		<Box sx={{ padding: '3rem 0' }}>
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
