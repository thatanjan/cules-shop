import React from 'react'
import Typography from '@material-ui/core/Typography'

import CustomBackdrop from 'components/Loaders/CustomBackdrop'
import CustomAlert from 'components/Alerts/CustomAlert'
import ProductsShow from 'components/Products/ProductsShow'

import { useGetPopularProducts } from 'hooks/swr/useProductHooks'

import { totalCartItems } from 'graphql/queries/cartQueries'

const Explore = () => {
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
