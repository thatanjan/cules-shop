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
import CustomAlert from 'components/Alerts/CustomAlert'

import CustomBackdrop from 'components/Loaders/CustomBackdrop'

import { UserPayload } from 'interfaces/authentication'

import checkValidJWT from 'utils/auth/checkValidJWT'

import { useGetAllCategoryNames } from 'hooks/swr/useProductHooks'

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

const CategoryPreviews = () => {
	const { data, error } = useGetAllCategoryNames()

	if (error)
		return <CustomAlert checked severity='error' message='Something went wrong' />
	if (!data) return <CustomBackdrop />

	const {
		getAllCategoryNames: { categories },
	} = data

	return (
		<>
			{' '}
			{categories.slice(0, 5).map(({ name, _id }) => (
				<ProductPreviewTabs tabData={[new TabData(name, _id)]} />
			))}
		</>
	)
}

const Index = (props: Props) => {
	useStoreID(props)
	return (
		<>
			<ProductBannerSlideShow />

			<CategoryPreviews />
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
