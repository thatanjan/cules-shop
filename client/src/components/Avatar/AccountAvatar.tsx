import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Image from 'next/image'
import clsx from 'clsx'

interface Props {
	small?: boolean
	src: string
}

const useStyles = makeStyles((theme: Theme) => ({
	container: {
		'& img': {
			borderRadius: '100%',
		},
	},
	smallAvatarStyle: {
		'& > div': {
			width: '3rem',
		},
	},
	breakpointStyles: {
		'& > div': {
			width: '100%',
			[theme.breakpoints.down('md')]: {
				display: 'grid',
				placeItems: 'center',
			},
		},
	},
}))

const AccountAvatar = ({ small, src }: Props) => {
	const { container, smallAvatarStyle, breakpointStyles } = useStyles()

	return (
		<Box className={clsx(container, small ? smallAvatarStyle : breakpointStyles)}>
			<Image
				src={src}
				layout='responsive'
				height={100}
				width={100}
				objectFit='cover'
			/>
		</Box>
	)
}

export default AccountAvatar
