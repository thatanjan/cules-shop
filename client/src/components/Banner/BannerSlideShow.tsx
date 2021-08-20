import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { nanoid } from 'nanoid'

const useStyles = makeStyles({
	swiperContainer: {
		'& .swiper-pagination-bullet': {
			background: 'white',
		},
	},
})

const banners = ['cules-shop/pixel_2_xl_google-actualizacion-seguridad_wscp9z']

// autoplay={{
// 	delay: 3000,
// }}
const BannerSlideShow = () => {
	const { swiperContainer } = useStyles()
	return (
		<>
			<Swiper
				centeredSlides
				loop
				pagination={{
					clickable: true,
				}}
				navigation
				className={swiperContainer}
			>
				{/* <SwiperSlide key={nanoid()}> */}
				{banners.map(item => (
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
								variant='h4'
								sx={{ textTransform: 'capitalize', alignSelf: 'end' }}
							>
								Explore the new Technologies
							</Typography>
							<Button
								variant='outlined'
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
						<Image src={item} width={1920} height={1080} layout='responsive' />
					</Box>
				))}
				{/* </SwiperSlide> */}
			</Swiper>
		</>
	)
}

export default BannerSlideShow
