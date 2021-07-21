import React from 'react'
import Grid from '@material-ui/core/Grid'
import { nanoid } from 'nanoid'

import ProductPreview from 'components/Products/ProductPreview'
import Pagination from 'components/Paginations/Pagination'
import CustomBackdrop from 'components/Loaders/CustomBackdrop'

import { useGetAllCartProducts } from 'hooks/swr/useCartHooks'

interface Props {}

const CartItemsShow = (props: Props) => {
	const { data } = useGetAllCartProducts()

	if (!data) return <CustomBackdrop />

	return (
		<>
			<Grid container>
				{Array(10)
					.fill(0)
					.map(() => (
						<Grid
							key={nanoid()}
							item
							xs={6}
							sm={4}
							md={3}
							sx={{
								'@media only screen and (max-width: 350px)': {
									flexBasis: '100%',
									maxWidth: '100%',
								},
							}}
						>
							<ProductPreview cartPage />
						</Grid>
					))}
			</Grid>
			<Pagination getRedirectLink={(value: number) => `/cart?query=${value}`} />
		</>
	)
}

export default CartItemsShow
