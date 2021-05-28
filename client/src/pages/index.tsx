import React from 'react'

import BannerSlideShow from 'components/Banner/BannerSlideShow'
import ProductBanner from 'components/Banner/ProductBanner'
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper/core'

import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'
import 'swiper/components/navigation/navigation.min.css'

SwiperCore.use([Autoplay, Pagination, Navigation])

const Index = () => {
	return (
		<>
			<BannerSlideShow />
			<ProductBanner />
		</>
	)
}

export default Index
