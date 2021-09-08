import React from 'react'
import { useRouter } from 'next/router'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { nanoid } from 'nanoid'

import { useGetReviews } from 'hooks/swr/useProductHooks'

import Review from './Review'

const ReviewList = () => {
	const {
		query: { productID },
	} = useRouter()
	const { data } = useGetReviews(productID as string)

	if (!data) return null

	const {
		getReviews: { reviews },
	} = data

	return (
		<List>
			{reviews.map(review => (
				<ListItem key={nanoid()}>
					<Review {...review} />
				</ListItem>
			))}
		</List>
	)
}

export default ReviewList
