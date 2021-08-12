import React, { useEffect, Fragment } from 'react'
import jwtDecode from 'jwt-decode'
import { GetServerSideProps } from 'next'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import { nanoid } from 'nanoid'

import { setShippingAddress } from 'redux/slices/checkoutSlices'
import { useClearShippingAddress } from 'redux/hooks/useCheckoutHooks'
import { useStoreID } from 'redux/hooks/useUserHooks'

import { UserPayload } from 'interfaces/authentication'

import checkValidJWT from 'utils/auth/checkValidJWT'

import CheckoutForm from 'components/Forms/CheckoutForm'
import CartTotal from 'components/Cart/CartTotal'
import ShippingFormContainer from 'components/Forms/BillingForms/ShippingFormContainer'

import { useGetMultipleProfile } from 'hooks/swr/useProfileHooks'

interface Props {
	userID: string
	sellerID: string
}

interface CheckoutPageTitleProps {
	children: React.ReactNode
}

export const CheckoutPageTitle = ({ children }: CheckoutPageTitleProps) => (
	<>
		<Typography variant='h4' color='secondary' sx={{ marginBottom: '1rem' }}>
			{children}
		</Typography>
		<Divider />
	</>
)

const AddressShow = () => {
	const { data } = useGetMultipleProfile()

	if (!data) return null

	const {
		getMultipleProfile: [{ address, name }],
	} = data

	setShippingAddress({ name, ...address })

	const fields = Object.keys(address)

	return (
		<>
			{fields.map(field => (
				<Fragment key={nanoid()}>
					<Grid item xs={4} sx={{ textTransform: 'capitalize' }}>
						{field}
					</Grid>
					<Grid item xs={2}>
						:
					</Grid>
					<Grid item xs={6}>
						{address[field] || 'N/A'}
					</Grid>
				</Fragment>
			))}
		</>
	)
}

const CheckoutPage = (props: Props) => {
	useStoreID(props)
	const clearShippingAddress = useClearShippingAddress()

	useEffect(() => {
		return () => {
			clearShippingAddress()
		}
	}, [])

	return (
		<>
			<Typography
				align='center'
				variant='h3'
				component='h1'
				sx={{ marginBottom: '4rem', marginTop: '2rem' }}
				color='primary'
			>
				Checkout
			</Typography>

			<Grid container justifyContent='space-between'>
				<Grid item xs={12} md={6} sx={{ margin: '1rem 0' }}>
					<CheckoutPageTitle>Shipping Address</CheckoutPageTitle>

					<Grid container sx={{ margin: '1rem 0' }}>
						<Grid item xs={12} sx={{ marginBottom: '1rem' }}>
							<Typography variant='h5'>Current Address</Typography>
						</Grid>

						<AddressShow />
					</Grid>

					<Grid item xs={12}>
						<ShippingFormContainer />
					</Grid>
				</Grid>

				<Grid
					item
					xs={12}
					md={5}
					component={Paper}
					sx={{
						padding: '1rem',
						margin: { xs: '1rem 0', md: 0 },
						alignSelf: 'flex-start',
					}}
				>
					<CartTotal />
					<CheckoutForm />
				</Grid>
			</Grid>
		</>
	)
}

export default CheckoutPage

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const {
		cookies: { jwt },
	} = req

	let props = { userID: '', sellerID: '' }

	if (!jwt) return { props }

	const isValid = await checkValidJWT(jwt)

	const { userID, sellerID } = jwtDecode<UserPayload>(jwt)

	if (!isValid) return { props }

	props = { userID, sellerID: sellerID || '' }

	return { props }
}
