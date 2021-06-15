import React from 'react'
import SwiperCore, {
	Keyboard,
	Scrollbar,
	Autoplay,
	Pagination,
	Navigation,
} from 'swiper/core'

import BannerSlideShow from 'components/Banner/BannerSlideShow'
import ProductBannerSlideShow from 'components/Banner/ProductBannerSlideShow'
import ProductSlideShow from 'components/Products/ProductPreviewSlideShow'
import ProductPreviewTabs from 'components/Tabs/ProductPreviewTabs'

import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/scrollbar/scrollbar.min.css'

SwiperCore.use([Keyboard, Scrollbar, Autoplay, Pagination, Navigation])

const Index = () => {
	return (
		<>
			<BannerSlideShow />
			<ProductBannerSlideShow />
			<ProductSlideShow />
			<ProductPreviewTabs />
		</>
	)
}

export default Index
