import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { nanoid } from 'nanoid'

import useLargerThanMD from 'hooks/mediaQueries/useLargerThanMD'

const useStyles = makeStyles({
	swiperContainer: {
		'& .swiper-pagination-bullet': {
			background: 'white',
		},
	},
})

const banners = ['cules-shop/pixel_2_xl_google-actualizacion-seguridad_wscp9z']

const BannerSlideShow = () => {
	const { swiperContainer } = useStyles()
	const largerThanMD = useLargerThanMD()

	return (
		<>
			<Box sx={{ position: 'relative' }}>
				<Box
					sx={{
						position: 'absolute',
						zIndex: '9999',
						left: '10%',
						display: 'grid',
						height: '100%',
						gridRowGap: '2%',
					}}
				>
					<Typography
						variant={largerThanMD ? 'h2' : 'h4'}
						sx={{ textTransform: 'capitalize', alignSelf: 'end' }}
					>
						Explore the new Technologies
					</Typography>
					<Button
						variant='contained'
						sx={{
							alignSelf: 'start',
							justifySelf: 'start',
							padding: {
								sm: '2% 20%',
							},
						}}
					>
						EXPLORE
					</Button>
				</Box>

				<Swiper
					centeredSlides
					loop
					pagination={{
						clickable: true,
					}}
					autoplay={{
						delay: 3000,
					}}
					navigation
					className={swiperContainer}
				>
					{banners.map(item => (
						<SwiperSlide key={nanoid()}>
							<Box
								sx={{
									backgroundColor: '#00000096',
									position: 'absolute',
									zIndex: '999',
									height: '100%',
									width: '100%',
								}}
							/>
							<Image src={item} width={1920} height={1080} layout='responsive' />
						</SwiperSlide>
					))}
				</Swiper>
			</Box>
		</>
	)
}

export default BannerSlideShow
