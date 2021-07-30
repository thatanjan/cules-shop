import React from 'react'
import { nanoid } from 'nanoid'
import Grid from '@material-ui/core/Grid'

import ProductPreview from 'components/Products/ProductPreview'

import { MultiPleProducts } from 'interfaces/product'

interface Props {
	products: MultiPleProducts
}

const ProductsShow = ({ products }: Props) => {
	return (
		<>
			<Grid container>
				{products.map(product => (
					<Grid item xs={6} sm={4} lg={3} key={nanoid()}>
						<ProductPreview {...product} />
					</Grid>
				))}
			</Grid>
		</>
	)
}

export default ProductsShow
