import React from 'react'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles, Theme } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Image from 'next/image'
import clsx from 'clsx'

interface Props {
	small?: boolean
	src: string
	name: string
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

const AccountAvatar = ({ small, src, name }: Props) => {
	const { container, smallAvatarStyle, breakpointStyles } = useStyles()

	if (small && !src)
		return (
			<Avatar
				sx={{
					margin: '0 auto',
					width: '3rem',
					height: '3rem',
					fontSize: '70%',
				}}
			>
				{name.split(' ')[0]}
			</Avatar>
		)
	return (
		<>
			{src ? (
				<Box
					className={clsx(container, small ? smallAvatarStyle : breakpointStyles)}
				>
					<Image
						src={src}
						layout='responsive'
						height={100}
						width={100}
						objectFit='cover'
					/>
				</Box>
			) : (
				<Avatar
					sx={{
						margin: '0 auto',
						width: {
							xs: '8rem',
							sm: '10rem',
							md: '13rem',
						},
						height: { xs: '8rem', sm: '10rem', md: '13rem' },
						fontSize: '200%',
					}}
				>
					{name.split(' ')[0]}
				</Avatar>
			)}
		</>
	)
}

export default AccountAvatar
