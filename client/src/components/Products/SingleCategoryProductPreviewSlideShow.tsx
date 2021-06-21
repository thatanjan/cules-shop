import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { nanoid } from 'nanoid'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

import useSmallerThanSM from 'hooks/mediaQueries/useSmallerThanSM'

import ProductPreview from './ProductPreview'

export const useStyles = makeStyles({
	swiperContainer: {
		paddingBottom: '1.5rem',
		'& .swiper-pagination-bullet': {
			background: 'white',
		},
	},
	swiperSlideStyle: {
		display: 'grid',
		gridTemplateColumns: '1fr 1fr',
	},
})

const SlideShow = () => {
	const { swiperContainer, swiperSlideStyle } = useStyles()

	const isSmallerThanSM = useSmallerThanSM()

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
				navigation
				loop
				className={swiperContainer}
			>
				{[1, 2, 3, 4, 5].map(() => (
					<SwiperSlide
						key={nanoid()}
						className={clsx(!isSmallerThanSM && swiperSlideStyle)}
					>
						{[1, 2, 3, 4].map(() => (
							<ProductPreview twoColumn />
						))}
					</SwiperSlide>
				))}
			</Swiper>
		</>
	)
}

export default SlideShow
