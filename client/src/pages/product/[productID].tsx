import React from 'react'
import SwiperCore, {
	Keyboard,
	Scrollbar,
	Autoplay,
	Pagination,
	Navigation,
} from 'swiper/core'

import ProductOverviewTabs from 'components/Tabs/ProductOverviewTabs'
import ProductOverview from 'components/Products/ProductOverview'
import ProductPreviewTabs from 'components/Tabs/ProductPreviewTabs'

import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/scrollbar/scrollbar.min.css'

SwiperCore.use([Keyboard, Scrollbar, Autoplay, Pagination, Navigation])

const Product = () => {
	return (
		<>
			<ProductOverview />

			<ProductOverviewTabs />

			<ProductPreviewTabs tabNames={['related products']} />
		</>
	)
}

export default Product
