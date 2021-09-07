import React, { useState } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Alert, { AlertProps } from '@material-ui/core/Alert'
import AlertTitle from '@material-ui/core/AlertTitle'
import Slide from '@material-ui/core/Slide'
import Collapse from '@material-ui/core/Collapse'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		width: '100%',
		'& > * + *': {
			marginTop: theme.spacing(2),
		},
	},
}))

export type Severity = 'error' | 'success' | 'info'

export interface Props extends AlertProps {
	severity: Severity
	message?: string
	checked: boolean
}

export default function DescriptionAlerts({
	severity,
	message,
	checked,
	children,
	...props
}: Props) {
	const classes = useStyles()

	const [open, setOpen] = useState(true)

	return (
		<Slide
			direction='up'
			in={checked}
			mountOnEnter
			unmountOnExit
			timeout={{ exit: 3 }}
		>
			<div className={classes.root}>
				<Collapse in={open}>
					<Alert
						severity={severity}
						action={
							<IconButton
								aria-label='close'
								color='inherit'
								size='small'
								onClick={() => {
									setOpen(false)
								}}
							>
								<CloseIcon fontSize='inherit' />
							</IconButton>
						}
						{...props}
					>
						<AlertTitle style={{ textTransform: 'capitalize' }}>
							{severity}
						</AlertTitle>
						{message || children}
					</Alert>
				</Collapse>
			</div>
		</Slide>
	)
}
