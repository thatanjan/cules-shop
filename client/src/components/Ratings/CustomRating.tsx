import Rating, { RatingProps } from '@material-ui/core/Rating'

const CustomRating = (props: RatingProps) => {
	return (
		<Rating
			sx={{
				'& .MuiRating-iconEmpty': {
					color: '#818181',
				},
			}}
			{...props}
		/>
	)
}

export default CustomRating
