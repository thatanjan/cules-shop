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

const SlideShow = () => {
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
				pagination={{
					clickable: true,
				}}
				loop
				navigation
				className={swiperContainer}
			>
				{[1, 2, 3, 4, 5].map(() => (
					<SwiperSlide key={nanoid()}>
						{[1, 2, 3, 4, 5].map(() => (
							<ProductPreview twoColumn />
						))}
					</SwiperSlide>
				))}
			</Swiper>
		</>
	)
}

export default SlideShow
