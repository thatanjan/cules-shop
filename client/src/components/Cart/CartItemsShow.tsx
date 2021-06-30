import React from 'react'
import Grid from '@material-ui/core/Grid'

import ProductPreview from 'components/Products/ProductPreview'

interface Props {}

const CartItemsShow = (props: Props) => {
	return (
		<>
			<Grid container>
				{Array(10)
					.fill(0)
					.map(() => (
						<Grid item md={3}>
							<ProductPreview cartPage />
						</Grid>
					))}
			</Grid>
		</>
	)
}

export default CartItemsShow
