import React from 'react'
import { GetServerSideProps } from 'next'
import SwiperCore, {
	Keyboard,
	Scrollbar,
	Autoplay,
	Pagination,
	Navigation,
} from 'swiper/core'

import ProductBannerSlideShow from 'components/Banner/ProductBannerSlideShow'
import ProductPreviewTabs from 'components/Tabs/ProductPreviewTabs'

import checkValidJWT from 'utils/auth/checkValidJWT'

import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/scrollbar/scrollbar.min.css'

SwiperCore.use([Keyboard, Scrollbar, Autoplay, Pagination, Navigation])

const Index = () => {
	return (
		<>
			<ProductBannerSlideShow />
			<ProductPreviewTabs tabNames={['featured', 'on Sale', 'top rated']} />
			<ProductPreviewTabs tabNames={['Television']} />
		</>
	)
}

export default Index

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const {
		cookies: { jwt },
	} = req

	const props = { isAuthenticated: false, userID: '' }

	if (!jwt) return { props }

	const isValid = await checkValidJWT(jwt)

	if (!isValid) return { props }

	props.isAuthenticated = true

	return { props }
}
