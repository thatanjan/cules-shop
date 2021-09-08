import React from 'react'
import jwtDecode from 'jwt-decode'
import { GetServerSideProps } from 'next'
import SwiperCore, {
	Keyboard,
	Scrollbar,
	Autoplay,
	Pagination,
	Navigation,
} from 'swiper/core'

import { useStoreID } from 'redux/hooks/useUserHooks'

import ProductBannerSlideShow from 'components/Banner/ProductBannerSlideShow'
import ProductPreviewTabs from 'components/Tabs/ProductPreviewTabs'

import { UserPayload } from 'interfaces/authentication'

import checkValidJWT from 'utils/auth/checkValidJWT'

import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'
import 'swiper/components/navigation/navigation.min.css'
import 'swiper/components/scrollbar/scrollbar.min.css'

SwiperCore.use([Keyboard, Scrollbar, Autoplay, Pagination, Navigation])

interface Props {
	userID: string
	sellerID: string
}

export class TabData {
	name: string

	categoryID: string

	constructor(name: string, categoryID: string) {
		this.name = name
		this.categoryID = categoryID
	}
}

const Index = (props: Props) => {
	useStoreID(props)
	return (
		<>
			<ProductBannerSlideShow />
			<ProductPreviewTabs
				tabData={[new TabData('Televisions', '60f27c41389742613420479a')]}
			/>
			<ProductPreviewTabs
				tabData={[new TabData('Mobiles', '61345b7eda0b1e3e4df1ee9f')]}
			/>
			<ProductPreviewTabs
				tabData={[new TabData('Air Conditioners', '61345bc0da0b1e3e4df1eea0')]}
			/>
			<ProductPreviewTabs
				tabData={[new TabData('Laptops', '61345c95da0b1e3e4df1eea2')]}
			/>
		</>
	)
}

export default Index

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const {
		cookies: { jwt },
	} = req

	let props = { userID: '', sellerID: '' }

	if (!jwt) return { props }

	const isValid = await checkValidJWT(jwt)

	if (!isValid) return { props }

	const { userID, sellerID } = jwtDecode<UserPayload>(jwt)

	props = { userID, sellerID: sellerID || '' }

	return { props }
}
