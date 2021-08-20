import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { makeStyles } from '@material-ui/core/styles'
import { nanoid } from 'nanoid'

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
	return (
		<>
			<Swiper
				centeredSlides
				loop
				autoplay={{
					delay: 3000,
				}}
				pagination={{
					clickable: true,
				}}
				navigation
				className={swiperContainer}
			>
				{banners.map(item => (
					<SwiperSlide key={nanoid()}>
						<Image src={item} width={1920} height={1080} layout='responsive' />
					</SwiperSlide>
				))}
			</Swiper>
		</>
	)
}

export default BannerSlideShow
