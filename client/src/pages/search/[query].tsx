import React, { useState } from 'react'
import { GetServerSideProps } from 'next'
import jwtDecode from 'jwt-decode'
import Typography from '@material-ui/core/Typography'

import { UserPayload } from 'interfaces/authentication'

import checkValidJWT from 'utils/auth/checkValidJWT'

import { useStoreID } from 'redux/hooks/useUserHooks'

interface Props {
	userID: string
	sellerID: string
	query: string
}

const Query = ({ query, ...userDetails }: Props) => {
	useStoreID(userDetails)
	const [searchInput, setSearchInput] = useState('')

	return (
		<>
			<Typography align='center' variant='h3' sx={{ m: '1rem 0' }}>
				Search Products
			</Typography>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async ({
	req,
	query: { query },
}) => {
	const {
		cookies: { jwt },
	} = req

	let props = { userID: '', sellerID: '', query }

	if (!jwt) return { props }

	const isValid = await checkValidJWT(jwt)

	const { userID, sellerID } = jwtDecode<UserPayload>(jwt)

	if (!isValid) return { props }

	props = { ...props, userID, sellerID: sellerID || '' }

	return { props }
}

export default Query
