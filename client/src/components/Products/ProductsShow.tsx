import React from 'react'
import { nanoid } from 'nanoid'
import Grid from '@material-ui/core/Grid'

import ProductPreview from 'components/Products/ProductPreview'

import { MultiPleProducts, MutationDeps } from 'interfaces/product'

interface Props extends MutationDeps {
	products: MultiPleProducts
}

const ProductsShow = ({ products, mutationDeps }: Props) => {
	return (
		<>
			<Grid container>
				{products.map(product => (
					<Grid item xs={6} sm={4} lg={3} key={nanoid()}>
						<ProductPreview {...product} mutationDeps={mutationDeps} />
					</Grid>
				))}
			</Grid>
		</>
	)
}

export default ProductsShow
