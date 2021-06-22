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

interface Props {
	singleTab: boolean | undefined
}

const ProductSlideShow = ({ singleTab }: Props) => {
	const { swiperContainer } = useStyles()
	return (
		<>
			<Swiper
				slidesPerView={1}
				slidesPerColumn={singleTab ? 4 : 1}
				centeredSlides={false}
				slidesPerGroupSkip={1}
				slidesPerColumnFill='row'
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
						slidesPerColumn: 2,
					},
					'960': {
						slidesPerView: 4,
						slidesPerGroup: 4,
						slidesPerColumn: 2,
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
						<ProductPreview twoColumn={singleTab} />
					</SwiperSlide>
				))}
			</Swiper>
		</>
	)
}

export default ProductSlideShow
