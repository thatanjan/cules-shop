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

import { useGetCategoryProducts } from 'hooks/swr/useProductHooks'

import { sortType } from 'variables/global'

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

	hook: Function

	constructor(name: string, hook: Function) {
		this.name = name
		this.hook = hook
	}
}

const Index = (props: Props) => {
	useStoreID(props)
	const { NAME } = sortType
	return (
		<>
			<ProductBannerSlideShow />
			<ProductPreviewTabs
				tabData={[
					new TabData('Television', () =>
						useGetCategoryProducts({
							categoryID: '60f27c41389742613420479a',
							skip: 0,
							sortBy: NAME,
						})
					),
				]}
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

	const { userID, sellerID } = jwtDecode<UserPayload>(jwt)

	if (!isValid) return { props }

	props = { userID, sellerID: sellerID || '' }

	return { props }
}
