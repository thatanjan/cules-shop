import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { nanoid } from 'nanoid'
import { makeStyles } from '@material-ui/core/styles'

import { useGetCategoryProducts } from 'hooks/swr/useProductHooks'

import {
	getAllCategoryNames,
	getProductDetails,
	isProductInTheCart,
	getCategoryProducts,
	searchProducts,
	getReviews,
} from 'graphql/queries/productQueries'

import { sortType } from 'variables/global'

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
	categoryID: string
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

const ProductSlideShow = ({ singleTab, categoryID }: Props) => {
	const { swiperContainer } = useStyles()

	const { NAME } = sortType

	const { data } = useGetCategoryProducts({ categoryID, skip: 0, sortBy: NAME })

	if (!data) return null

	const {
		getCategoryProducts: { products },
	} = data

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
				{products.map(product => (
					<SwiperSlide key={nanoid()}>
						<ProductPreview
							{...product}
							mutationDeps={[[getCategoryProducts, categoryID + NAME + 0]]}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</>
	)
}

export default ProductSlideShow
