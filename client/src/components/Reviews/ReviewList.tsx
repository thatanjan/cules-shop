import React from 'react'
import { useRouter } from 'next/router'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import { nanoid } from 'nanoid'

import { useGetReviews } from 'hooks/swr/useProductHooks'

import Review from './Review'

interface Props {}

const ReviewList = (props: Props) => {
	const {
		query: { productID },
	} = useRouter()
	const { data, error } = useGetReviews(productID as string)

	if (!data) return null

	const {
		getReviews: { reviews },
	} = data

	console.log(data)
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
