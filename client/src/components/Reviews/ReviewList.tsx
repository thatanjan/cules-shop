import React from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { nanoid } from 'nanoid'

import Review from './Review'

interface Props {}

const ReviewList = (props: Props) => {
	return (
		<List>
			{Array(10)
				.fill(0)
				.map(() => (
					<ListItem key={nanoid()}>
						<Review />
					</ListItem>
				))}
		</List>
	)
}

export default ReviewList
