import React from 'react'
import Grid from '@material-ui/core/Grid'
import { nanoid } from 'nanoid'

import ProductPreview from 'components/Products/ProductPreview'

import { CartProduct } from 'interfaces/cart'

import {
	totalCartItems,
	totalCartPrice,
	getAllCartProducts,
} from 'graphql/queries/cartQueries'

interface Props {
	cartProducts: Array<CartProduct>
}

const CartItemsShow = ({ cartProducts }: Props) => {
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
						<ProductPreview
							cartPage
							{...product}
							mutationDeps={[
								[getAllCartProducts, undefined],
								[totalCartPrice, undefined],
								[totalCartItems, undefined],
							]}
						/>
					</Grid>
				))}
			</Grid>
		</>
	)
}

export default CartItemsShow
