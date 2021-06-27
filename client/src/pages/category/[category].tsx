import React from 'react'
import { GetServerSideProps } from 'next'
import Typography from '@material-ui/core/Typography'

interface Props {
	category: string
}

const Category = ({ category }: Props) => {
	return (
		<>
			<Typography variant='h3'>{category}</Typography>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async ({
	query: { category },
}) => {
	return { props: { category } }
}

export default Category
