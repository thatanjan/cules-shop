import React, { useState } from 'react'
import dynamic from 'next/dynamic'
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

import CustomBackdrop from 'components/Loaders/CustomBackdrop'

import { UserPayload } from 'interfaces/authentication'

import checkValidJWT from 'utils/auth/checkValidJWT'

import { useGetCategoryProducts } from 'hooks/swr/useProductHooks'
import { useStoreID } from 'redux/hooks/useUserHooks'

import { getCategoryProducts } from 'graphql/queries/productQueries'
import { totalCartItems } from 'graphql/queries/cartQueries'

const CategoryPagination = dynamic(
	() => import('components/Paginations/Pagination')
)
const ProductsShow = dynamic(() => import('components/Products/ProductsShow'))

interface Props {
	categoryID: string
	categoryName: string
	page: number
	userID: string
	sellerID: string
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

const Header = ({ categoryName }: Props) => {
	return (
		<Grid
			container
			justifyContent='space-between'
			alignItems='center'
			sx={{ marginTop: '1rem' }}
		>
			<Grid
				item
				component={Typography}
				variant='h3'
				sx={{ textTransform: 'capitalize' }}
				xs={12}
				sm={8}
				md={7}
			>
				{categoryName}
			</Grid>
			<Grid item component={Typography} xs={6} sm={4} md={3} align='right'>
				Showing 1-30 of 40 results
			</Grid>

			<Grid item xs={6} sm={12} md={2}>
				<Box sx={{ display: 'grid', justifyItems: 'end' }}>
					<SortingSelection />
				</Box>
			</Grid>
		</Grid>
	)
}

const Category = ({ categoryID, categoryName, page, ...others }: Props) => {
	const skip = (page - 1) * 30

	useStoreID(others)

	const { data, isValidating } = useGetCategoryProducts({
		categoryID,
		sortBy: 'NAME',
		skip,
	})

	if (!data) return null

	const {
		getCategoryProducts: { products, totalProducts },
	} = data

	if (!products.length) return null

	return (
		<>
			{isValidating && <CustomBackdrop />}

			<Header {...{ categoryID, categoryName, page }} />

			<ProductsShow
				products={products}
				mutationDeps={[
					[getCategoryProducts, categoryID + 'NAME' + skip],
					[totalCartItems, undefined],
				]}
			/>

			<CategoryPagination
				totalPages={Math.ceil(totalProducts / 30)}
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
	query: { category, page },
	req,
}) => {
	const {
		cookies: { jwt },
	} = req

	const doesCategoryExist = await validateCategory(category as string)
	const pageParam = parseInt(page as string, 10)

	if (!doesCategoryExist || !pageParam)
		return { redirect: { destination: '/404', permanent: false } }

	let props = {
		userID: '',
		sellerID: '',
		categoryID: category,
		categoryName: doesCategoryExist.name,
		page: pageParam,
	}

	if (!jwt) return { props }

	const isValid = await checkValidJWT(jwt)

	const { userID, sellerID } = jwtDecode<UserPayload>(jwt)

	if (!isValid) return { props }

	props = { ...props, userID, sellerID: sellerID || '' }

	return { props }
}

export default Category
