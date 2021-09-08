import React from 'react'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'

const CustomBackdrop = () => {
	return (
		<Backdrop
			sx={{
				color: theme => theme.palette.primary.main,
				zIndex: theme => theme.zIndex.drawer + 1,
			}}
			open
		>
			<CircularProgress color='inherit' />
		</Backdrop>
	)
}

export default CustomBackdrop
