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

const singleTabBreakpointStyle = {
	'500': {
		slidesPerView: 2,
		slidesPerGroup: 2,
	},
	'700': {
		slidesPerView: 3,
		slidesPerGroup: 3,
	},
	'800': {
		slidesPerColumn: 2,
		slidesPerView: 3,
		slidesPerGroup: 3,
	},
	'1400': {
		slidesPerView: 4,
		slidesPerColumn: 2,
		slidesPerGroup: 4,
	},
}

const ProductSlideShow = ({ singleTab }: Props) => {
	const { swiperContainer } = useStyles()
	return (
		<>
			<Swiper
				slidesPerView={1}
				slidesPerColumnFill='row'
				centeredSlides={false}
				grabCursor
				keyboard={{
					enabled: true,
				}}
				breakpoints={
					singleTab
						? singleTabBreakpointStyle
						: {
								'0': { slidesPerView: 2, slidesPerGroup: 2 },
								'450': { slidesPerView: 3, slidesPerGroup: 3 },
								'800': {
									slidesPerView: 4,
									slidesPerGroup: 4,
								},
								'1400': {
									slidesPerView: 5,
									slidesPerGroup: 5,
								},
						  }
				}
				pagination={{
					clickable: true,
				}}
				navigation
				className={swiperContainer}
			>
				{Array(20)
					.fill(0)
					.map(() => (
						<SwiperSlide key={nanoid()}>
							<ProductPreview twoColumn={singleTab} />
						</SwiperSlide>
					))}
			</Swiper>
		</>
	)
}

export default ProductSlideShow
