import React, { useState } from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { GetServerSideProps } from 'next'
import Typography from '@material-ui/core/Typography'
import InputLabel from '@material-ui/core/InputLabel'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import { nanoid } from 'nanoid'

import ProductPreview from 'components/Products/ProductPreview'
import CategoryPagination from 'components/Paginations/Pagination'
import CustomBackdrop from 'components/Loaders/CustomBackdrop'

import { UserPayload } from 'interfaces/authentication'

import checkValidJWT from 'utils/auth/checkValidJWT'

import { useGetCategoryProducts } from 'hooks/swr/useProductHooks'

interface Props {
	categoryID: string
	categoryName: string
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

const Header = ({ categoryID, categoryName }: Props) => {
	return (
		<Grid container justifyContent='space-between' alignItems='center'>
			<Grid item component={Typography} variant='h3'>
				{categoryName}
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

const Category = ({ categoryID, categoryName }: Props) => {
	const { data, isValidating } = useGetCategoryProducts({
		skip: 0,
		categoryID,
		sortBy: 'NAME',
	})

	if (!data) return null

	const {
		getCategoryProducts: { products },
	} = data

	return (
		<>
			{isValidating && <CustomBackdrop />}

			<Header {...{ categoryID, categoryName }} />

			<Grid container>
				{products.map(product => (
					<Grid item xs={6} sm={4} lg={3} key={nanoid()}>
						<ProductPreview {...product} />
					</Grid>
				))}
			</Grid>

			<CategoryPagination
				getRedirectLink={(value: number) => `/category/${categoryID}?page=${value}`}
			/>

			<Divider sx={{ margin: '3rem 0' }} />
		</>
	)
}

const validateCategory = async (categoryID: string) => {
	try {
		const { data } = await axios.get(
			process.env.NEXT_PUBLIC_SERVER_CATEGORY_VALIDATE,
			{
				data: { categoryID },
			}
		)

		if (data) return data

		return false
	} catch (error) {
		return false
	}
}

export const getServerSideProps: GetServerSideProps = async ({
	query: { category },
	req,
}) => {
	const {
		cookies: { jwt },
	} = req

	const doesCategoryExist = await validateCategory(category as string)

	if (!doesCategoryExist)
		return { redirect: { destination: '/404', permanent: false } }

	let props = {
		userID: '',
		sellerID: '',
		categoryID: category,
		categoryName: doesCategoryExist.name,
	}

	if (!jwt) return { props }

	const isValid = await checkValidJWT(jwt)

	const { userID, sellerID } = jwtDecode<UserPayload>(jwt)

	if (!isValid) return { props }

	props = { ...props, userID, sellerID: sellerID || '' }

	return { props }
}

export default Category
