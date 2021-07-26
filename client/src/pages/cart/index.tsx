import React from 'react'
import jwtDecode from 'jwt-decode'
import { GetServerSideProps } from 'next'
import dynamic from 'next/dynamic'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

import CustomBackdrop from 'components/Loaders/CustomBackdrop'
import MuiLink from 'components/Links/MuiLink'

import { UserPayload } from 'interfaces/authentication'

import checkValidJWT from 'utils/auth/checkValidJWT'

import { LOGIN_URL } from 'variables/global'

import { useGetAllCartProducts } from 'hooks/swr/useCartHooks'

const CartItemsShow = dynamic(() => import('components/Cart/CartItemsShow'))
const CartTotal = dynamic(() => import('components/Cart/CartTotal'))
const CoupnInput = dynamic(() => import('components/Cart/CoupnInput'))

interface Props {}

interface CustomButtonProps {
	children: React.ReactNode
	href: string
}

const CustomButton = ({ children, href }: CustomButtonProps) => {
	return (
		<Grid
			item
			xs={12}
			sm={5}
			sx={{ marginBottom: '.5rem', marginLeft: { sm: '1rem' } }}
		>
			<MuiLink MuiComponent={Button} variant='contained' fullWidth href={href}>
				{children}
			</MuiLink>
		</Grid>
	)
}

const CartPage = (props: Props) => {
	const { data, isValidating } = useGetAllCartProducts()

	if (!data) return <CustomBackdrop />

	const {
		getAllCartProducts: { cartProducts },
	} = data

	return (
		<div>
			{cartProducts.length > 0 ? (
				<>
					{isValidating && <CustomBackdrop />}

					<Typography component='h1' variant='h3' align='center'>
						Cart
					</Typography>
					<CartItemsShow cartProducts={cartProducts} />

					<Grid container sx={{ marginTop: '1rem' }}>
						<Grid item xs={12} md={8} lg={6} sx={{ maxWidth: '50rem' }}>
							<CoupnInput />
						</Grid>
						<Grid
							item
							container
							xs={12}
							lg={6}
							justifyContent='flex-end'
							alignItems='center'
						>
							<CustomButton href='/cart'>Update Cart</CustomButton>
							<CustomButton href='/checkout'>Procced to checkout</CustomButton>
						</Grid>
					</Grid>

					<Grid container justifyContent='flex-end'>
						<Grid item xs={12} md={6}>
							<CartTotal />
						</Grid>
					</Grid>
				</>
			) : (
				<Grid
					container
					justifyContent='center'
					alignItems='center'
					sx={{ height: '100vh' }}
				>
					<Grid item>
						<Typography variant='h3' align='center'>
							No products in the Cart
						</Typography>
					</Grid>
				</Grid>
			)}
		</div>
	)
}

export default CartPage

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const {
		cookies: { jwt },
	} = req

	let props = { userID: '', sellerID: '' }

	if (!jwt)
		return { props, redirect: { destination: LOGIN_URL, permanent: false } }

	const isValid = await checkValidJWT(jwt)

	const { userID, sellerID } = jwtDecode<UserPayload>(jwt)

	if (!isValid) return { props }

	props = { userID, sellerID: sellerID || '' }

	return { props }
}
