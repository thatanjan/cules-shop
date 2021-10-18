import React from 'react'
import jwtDecode from 'jwt-decode'
import { GetServerSideProps } from 'next'

import { useStoreID } from 'redux/hooks/useUserHooks'

import { UserPayload } from 'interfaces/authentication'

import checkValidJWT from 'utils/auth/checkValidJWT'

import Box from '@material-ui/core/Box'

import Image from 'next/image'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

import MuiLink from 'components/Links/MuiLink'

import { useGetAllCategoryNames } from 'hooks/swr/useProductHooks'

interface Props {
	userID: string
	sellerID: string
}

export interface SingleCategoryProps {
	name: string
	image: string
	_id: string
}

const SingleCategory = ({ name, image, _id }: SingleCategoryProps) => {
	const categoryPageLink = `/category/${_id}?page=1`

	return (
		<Card
			sx={{
				m: '1rem auto',
				width: '90%',
			}}
		>
			<MuiLink
				href={categoryPageLink}
				MuiComponent={CardMedia}
				sx={{
					width: '100%',
					m: 'auto',
				}}
			>
				<Image
					src={image}
					width={1}
					height={1}
					layout='responsive'
					quality={20}
					objectFit='cover'
				/>
			</MuiLink>

			<Box sx={{ flexGrow: 1, m: '1rem 0' }}>
				<CardHeader
					title={
						<MuiLink
							MuiComponent={Typography}
							sx={{ textTransform: 'capitalize' }}
							href={categoryPageLink}
							variant='h6'
						>
							{name}
						</MuiLink>
					}
				/>
			</Box>
		</Card>
	)
}

const AllCategory = () => {
	const { data } = useGetAllCategoryNames()

	if (!data) return null

	const {
		getAllCategoryNames: { categories },
	} = data

	return (
		<>
			<Box sx={{ width: '100%' }}>
				<Grid container>
					{categories.map(({ name, image, _id }) => (
						<Grid item xs={12} sm={4} md={3}>
							<SingleCategory
								{...{
									name,
									image,
									_id,
								}}
							/>
						</Grid>
					))}
				</Grid>
			</Box>
		</>
	)
}

const CategoryPage = (props: Props) => {
	useStoreID(props)
	return (
		<>
			<Typography align='center' variant='h2' sx={{ m: '1rem 0' }}>
				Categories
			</Typography>
			<AllCategory />
		</>
	)
}

export default CategoryPage

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const {
		cookies: { jwt },
	} = req

	let props = { userID: '', sellerID: '' }

	if (!jwt) return { props }

	const isValid = await checkValidJWT(jwt)

	if (!isValid) return { props }

	const { userID, sellerID } = jwtDecode<UserPayload>(jwt)

	props = { userID, sellerID: sellerID || '' }

	return { props }
}
