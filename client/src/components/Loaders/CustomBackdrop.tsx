import React from 'react'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'

interface Props {}

const CustomBackdrop = (props: Props) => {
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
