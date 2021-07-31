import React, { useState, FormEvent } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import jwtDecode from 'jwt-decode'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

import { UserPayload } from 'interfaces/authentication'

import checkValidJWT from 'utils/auth/checkValidJWT'

import { useStoreID } from 'redux/hooks/useUserHooks'

import { useSearchProducts } from 'hooks/swr/useProductHooks'

import { sortType } from 'variables/global'

import { totalCartItems } from 'graphql/queries/cartQueries'
import { searchProducts } from 'graphql/queries/productQueries'

import CustomBackdrop from 'components/Loaders/CustomBackdrop'
import ProductsShow from 'components/Products/ProductsShow'

interface Props {
	userID: string
	sellerID: string
	query: string
	page: number
}

interface InputProps {
	page: number
	query: string
}

const ShowSearchResults = ({ page, query }: InputProps) => {
	const { NAME } = sortType

	const skip = (page - 1) * 30
	const { data, isValidating } = useSearchProducts({
		query,
		skip,
		sortBy: NAME,
	})

	if (!data) return <CustomBackdrop />

	const {
		searchProducts: { products },
	} = data

	return (
		<>
			{isValidating && <CustomBackdrop />}
			<ProductsShow
				products={products}
				mutationDeps={[
					[searchProducts, query + skip],
					[totalCartItems, undefined],
				]}
			/>
		</>
	)
}

interface InputFieldProps {
	query: string
}

const SearchInputField = ({ query }: InputFieldProps) => {
	const { push } = useRouter()
	const [searchInput, setSearchInput] = useState(query)

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const queryString = searchInput.trim().replace(/\s/g, '+')

		push(`/search?query=${queryString}`)

		return true
	}

	return (
		<form onSubmit={handleSubmit}>
			<TextField
				value={searchInput}
				fullWidth
				onChange={e => setSearchInput(e.target.value)}
				variant='standard'
				label='Search Products'
			/>
			<Button
				variant='contained'
				type='submit'
				sx={{ m: '.8rem 0' }}
				disabled={!searchInput}
			>
				search
			</Button>
		</form>
	)
}

const Query = ({ query, page, ...userDetails }: Props) => {
	useStoreID(userDetails)

	return (
		<>
			<Typography align='center' variant='h3' sx={{ m: '1rem 0' }}>
				Search Products
			</Typography>

			<SearchInputField {...{ query }} />

			<ShowSearchResults {...{ page, query }} />
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async ({
	req,
	query: { query, page },
}) => {
	const {
		cookies: { jwt },
	} = req

	let props = {
		userID: '',
		sellerID: '',
		query: query ? (query as string).replace(/\+/g, ' ').trim() : '',
		page: parseInt(page as string, 10) || 1,
	}

	if (!jwt) return { props }

	const isValid = await checkValidJWT(jwt)

	const { userID, sellerID } = jwtDecode<UserPayload>(jwt)

	if (!isValid) return { props }

	props = { ...props, userID, sellerID: sellerID || '' }

	return { props }
}

export default Query
