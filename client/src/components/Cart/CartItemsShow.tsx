import React from 'react'
import Grid from '@material-ui/core/Grid'

import ProductPreview from 'components/Products/ProductPreview'

import Pagination from 'components/Paginations/Pagination'

interface Props {}

const CartItemsShow = (props: Props) => {
	return (
		<>
			<Grid container>
				{Array(10)
					.fill(0)
					.map(() => (
						<Grid
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
