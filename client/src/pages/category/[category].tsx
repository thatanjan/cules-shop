import React from 'react'
import { GetServerSideProps } from 'next'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

interface Props {
	category: string
}

const Header = ({ category }: Props) => {
	return (
		<Grid container justifyContent='space-between' alignItems='center'>
			<Grid item component={Typography} variant='h3'>
				{category}
			</Grid>
			<Grid item component={Typography}>
				showing 1-30 of 40 results
			</Grid>
		</Grid>
	)
}

const Category = ({ category }: Props) => {
	return (
		<>
			<Header {...{ category }} />
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async ({
	query: { category },
}) => {
	return { props: { category } }
}

export default Category
