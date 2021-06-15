import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { nanoid } from 'nanoid'
import { makeStyles } from '@material-ui/core/styles'

import ProductPreview from './ProductPreview'

export const useStyles = makeStyles({
	swiperContainer: {
		paddingBottom: '1.5rem',
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
				slidesPerView={1}
				centeredSlides={false}
				slidesPerGroupSkip={1}
				grabCursor
				keyboard={{
					enabled: true,
				}}
				breakpoints={{
					'300': {
						slidesPerView: 2,
						slidesPerGroup: 2,
					},
					'600': {
						slidesPerView: 3,
						slidesPerGroup: 3,
					},
				}}
				pagination={{
					clickable: true,
				}}
				loop
				navigation
				className={swiperContainer}
			>
				{[1, 2, 3, 4, 5].map(() => (
					<SwiperSlide key={nanoid()}>
						<ProductPreview />
					</SwiperSlide>
				))}
			</Swiper>
		</>
	)
}

export default BannerSlideShow
