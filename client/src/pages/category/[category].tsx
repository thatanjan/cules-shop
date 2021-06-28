import React, { useState } from 'react'
import { GetServerSideProps } from 'next'
import Typography from '@material-ui/core/Typography'
import InputLabel from '@material-ui/core/InputLabel'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Box from '@material-ui/core/Box'

interface Props {
	category: string
}

const SortingSelection = () => {
	const [sortBy, setSortBy] = useState('default')

	const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
		setSortBy(event.target.value as string)
	}

	return (
		<FormControl>
			<InputLabel id='demo-simple-select-autowidth-label'>Sort By</InputLabel>
			<Select
				labelId='demo-simple-select-autowidth-label'
				id='demo-simple-select-autowidth'
				value={sortBy}
				onChange={handleChange}
				autoWidth
				label='Age'
			>
				<MenuItem value='default'>
					<em>None</em>
				</MenuItem>
				<MenuItem value={10}>Twenty</MenuItem>
				<MenuItem value={21}>Twenty one</MenuItem>
				<MenuItem value={22}>Twenty one and a half</MenuItem>
			</Select>
		</FormControl>
	)
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

			<Grid item xs={12}>
				<Box sx={{ display: 'grid', justifyItems: 'end' }}>
					<SortingSelection />
				</Box>
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
