import React from 'react'
import Grid from '@material-ui/core/Grid'
import Image from 'next/image'

interface Props {}

const ProductOverview = (props: Props) => {
	return (
		<Grid container>
			<Grid item xs={12}>
				<Image
					src='/products/product.png'
					layout='responsive'
					width={1920}
					height={1080}
				/>
			</Grid>
		</Grid>
	)
}

export default ProductOverview
