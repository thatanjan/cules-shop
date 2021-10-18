import React from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { GetServerSideProps } from 'next'
import SwiperCore, {
	Keyboard,
	Scrollbar,
	Autoplay,
	Pagination,
	Navigation,
} from 'swiper/core'

import ProductOverviewTabs from 'components/Tabs/ProductOverviewTabs'
import ProductOverview from 'components/Products/ProductOverview'
import CustomBackdrop from 'components/Loaders/CustomBackdrop'

import { useStoreID } from 'redux/hooks/useUserHooks'

import { useGetProductDetails } from 'hooks/swr/useProductHooks'

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
	productID: string
}

const Product = ({ productID, ...props }: Props) => {
	useStoreID(props)

	const { data } = useGetProductDetails(productID)

	if (!data) return <CustomBackdrop />

	const {
		getProductDetails: { name, image, quantity, price, category, description },
	} = data

	return (
		<>
			<ProductOverview {...{ name, image, quantity, price, category }} />

			<ProductOverviewTabs description={description} />

			{/* <ProductPreviewTabs tabNames={['related products']} /> */}
		</>
	)
}

export default Product

const validateProduct = async (productID: string) => {
	try {
		const { data } = await axios.get(
			process.env.NEXT_PUBLIC_SERVER_PRODUCT_VALIDATE,
			{
				data: { productID },
			}
		)

		if (data) return true

		return false
	} catch (error) {
		return false
	}
}

export const getServerSideProps: GetServerSideProps = async ({
	req,
	query: { productID },
}) => {
	const isValidProduct = await validateProduct(productID as string)

	if (!isValidProduct) {
		return { redirect: { destination: '/404', permanent: false } }
	}

	const {
		cookies: { jwt },
	} = req

	let props = { userID: '', sellerID: '', productID }

	if (!jwt) return { props }

	const isValid = await checkValidJWT(jwt)

	const { userID, sellerID } = jwtDecode<UserPayload>(jwt)

	if (!isValid) return { props }

	props = { ...props, userID, sellerID: sellerID || '' }

	return { props }
}
