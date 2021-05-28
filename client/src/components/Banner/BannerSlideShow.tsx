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
				{[1, 2, 3, 4, 5].map(() => (
					<SwiperSlide key={nanoid()}>
						<Image src='/banner.jpg' width={1920} height={1080} layout='responsive' />
					</SwiperSlide>
				))}
			</Swiper>
		</>
	)
}

export default BannerSlideShow
