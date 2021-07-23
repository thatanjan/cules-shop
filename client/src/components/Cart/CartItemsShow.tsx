import React from 'react'
import Grid from '@material-ui/core/Grid'
import { nanoid } from 'nanoid'

import ProductPreview from 'components/Products/ProductPreview'
import CustomBackdrop from 'components/Loaders/CustomBackdrop'

import { useGetAllCartProducts } from 'hooks/swr/useCartHooks'

interface Props {}

const CartItemsShow = (props: Props) => {
	const { data } = useGetAllCartProducts()

	if (!data) return <CustomBackdrop />

	const {
		getAllCartProducts: { cartProducts },
	} = data

	return (
		<>
			<Grid container>
				{cartProducts.map(product => (
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
						<ProductPreview cartPage {...product} />
					</Grid>
				))}
			</Grid>
		</>
	)
}

export default CartItemsShow
