import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'

import CustomRating from 'components/Ratings/CustomRating'

const Review = () => {
	return (
		<Card>
			<CardHeader
				avatar={
					<Avatar sx={{ bgcolor: 'red' }} aria-label='Review'>
						R
					</Avatar>
				}
				title='Anjan shomodder'
				subheader={<CustomRating readOnly value={4} />}
			/>

			<CardContent>
				<Typography>
					Lorem quae quae asperiores nobis magnam. At a dolores inventore non quasi
					exercitationem deleniti aliquam qui? Neque accusantium ad tenetur qui
					totam. Quod eveniet cum quas a vero molestiae deserunt
				</Typography>
			</CardContent>
		</Card>
	)
}

export default Review
