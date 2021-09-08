import React from 'react'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import CustomRating from 'components/Ratings/CustomRating'
import AccountAvatar from 'components/Avatar/AccountAvatar'

import { Review as ReviewInterface } from 'interfaces/product'

interface Props extends ReviewInterface {}

const Review = ({
	user: { name, profilePicture },
	date,
	star,
	description,
}: Props) => {
	return (
		<Card sx={{ flexBasis: '100%' }}>
			<CardHeader
				avatar={<AccountAvatar src={profilePicture} small name={name} />}
				title={name}
				subheader={
					<Grid container>
						<Grid item xs={6}>
							{date}
						</Grid>
						<Grid item xs={6} sx={{ display: 'grid', placeItems: 'end' }}>
							<CustomRating readOnly value={star} />
						</Grid>
					</Grid>
				}
			/>

			<CardContent>
				<Typography>{description}</Typography>
			</CardContent>
		</Card>
	)
}

export default Review
