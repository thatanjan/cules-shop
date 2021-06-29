import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Image from 'next/image'
import clsx from 'clsx'

interface Props {
	small?: boolean
}

const useStyles = makeStyles({
	container: {
		'& img': {
			borderRadius: '100%',
		},
		'& > div': {
			width: '100%',
		},
	},
	smallAvatarStyle: {
		'& > div': {
			width: '3rem',
		},
	},
})

const AccountAvatar = ({ small }: Props) => {
	const { container, smallAvatarStyle } = useStyles()

	return (
		<Box className={clsx(container, small && smallAvatarStyle)}>
			<Image
				src='/ts.jpg'
				layout='responsive'
				height={100}
				width={100}
				objectFit='cover'
			/>
		</Box>
	)
}

export default AccountAvatar
