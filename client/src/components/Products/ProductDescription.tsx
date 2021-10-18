import React from 'react'
import Typography from '@material-ui/core/Typography'
import { nanoid } from 'nanoid'

interface Props {
	description: string
}
const ProductDescription = ({ description }: Props) => {
	const paragraphs = description.split('\n')

	return (
		<>
			{paragraphs.map(paragraph => (
				<Typography key={nanoid()} sx={{ margin: '1rem 0' }}>
					{paragraph}
				</Typography>
			))}
		</>
	)
}

export default ProductDescription
