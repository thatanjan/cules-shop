import React from 'react'
import Typography from '@material-ui/core/Typography'

import jwtDecode from 'jwt-decode'
import { GetServerSideProps } from 'next'

import { useStoreID } from 'redux/hooks/useUserHooks'

import ProductBannerSlideShow from 'components/Banner/ProductBannerSlideShow'
import ProductPreviewTabs from 'components/Tabs/ProductPreviewTabs'
import CustomAlert from 'components/Alerts/CustomAlert'

import CustomBackdrop from 'components/Loaders/CustomBackdrop'

import { UserPayload } from 'interfaces/authentication'

import checkValidJWT from 'utils/auth/checkValidJWT'

import ProductsShow from 'components/Products/ProductsShow'

import { useGetPopularProducts } from 'hooks/swr/useProductHooks'

import { totalCartItems } from 'graphql/queries/cartQueries'

interface Props {
	userID: string
	sellerID: string
}

const Explore = (props: Props) => {
	useStoreID(props)

	const { data, error, isValidating } = useGetPopularProducts()

	if (error) return <CustomAlert checked severity='error' />
	if (!data) return <CustomBackdrop />

	const {
		getPopularProducts: { products, errorMessage },
	} = data

	if (errorMessage)
		return <CustomAlert checked severity='error' message={errorMessage} />

	return (
		<div>
			<Typography align='center' variant='h3' sx={{ m: '1rem 0' }}>
				Popular Products
			</Typography>

			{isValidating && <CustomBackdrop />}
			<ProductsShow
				products={products}
				mutationDeps={[[totalCartItems, undefined]]}
			/>
		</div>
	)
}

export default Explore

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
