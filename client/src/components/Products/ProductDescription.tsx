import React from 'react'
import Typography from '@material-ui/core/Typography'
import { nanoid } from 'nanoid'

const ProductDescription = () => {
	return (
		<>
			{Array(4)
				.fill(0)
				.map(() => (
					<Typography key={nanoid()} sx={{ margin: '1rem 0' }}>
						Consectetur excepturi obcaecati nihil officiis corrupti odit eius
						voluptatem At architecto inventore beatae maiores consectetur. Eum
						doloribus adipisci corporis voluptas dolor. Cumque itaque deserunt fugit
						eaque atque doloremque praesentium, temporibus
					</Typography>
				))}
		</>
	)
}

export default ProductDescription
