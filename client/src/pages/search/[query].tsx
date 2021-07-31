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

interface Props {
	userID: string
	sellerID: string
	query: string
	page: number
}

const Query = ({ query, page, ...userDetails }: Props) => {
	useStoreID(userDetails)
	const { push } = useRouter()
	const [searchInput, setSearchInput] = useState(query)

	const { NAME } = sortType

	const { data } = useSearchProducts({
		query: searchInput,
		skip: (page - 1) * 30,
		sortBy: NAME,
	})

	console.log(data)

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const queryString = searchInput.trim().replace(/\s/g, '+')

		push(`/search/${queryString}`)

		return true
	}

	return (
		<>
			<Typography align='center' variant='h3' sx={{ m: '1rem 0' }}>
				Search Products
			</Typography>

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
		query: (query as string).replace(/\+/g, ' ').trim(),
		page: parseInt(page, 10) || 1,
	}

	if (!jwt) return { props }

	const isValid = await checkValidJWT(jwt)

	const { userID, sellerID } = jwtDecode<UserPayload>(jwt)

	if (!isValid) return { props }

	props = { ...props, userID, sellerID: sellerID || '' }

	return { props }
}

export default Query
