import React, { useEffect, Fragment } from 'react'
import jwtDecode from 'jwt-decode'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import { nanoid } from 'nanoid'

import {
	setShippingAddress,
	setIsCurrentAddressValid,
} from 'redux/slices/checkoutSlices'
import {
	useClearShippingAddress,
	useGetCheckoutState,
	useResetCheckoutState,
} from 'redux/hooks/useCheckoutHooks'
import { useStoreID } from 'redux/hooks/useUserHooks'
import { useAppDispatch } from 'redux/hooks/appHooks'

import { UserPayload } from 'interfaces/authentication'

import checkValidJWT from 'utils/auth/checkValidJWT'

import CheckoutForm from 'components/Forms/CheckoutForm'
import CartTotal from 'components/Cart/CartTotal'
import ShippingFormContainer from 'components/Forms/BillingForms/ShippingFormContainer'
import CustomAlert from 'components/Alerts/CustomAlert'

import { useGetMultipleProfile } from 'hooks/swr/useProfileHooks'

interface Props {
	userID: string
	sellerID: string
}

interface CheckoutPageTitleProps {
	children: React.ReactNode
}

const CheckoutSuccessful = () => {
	const { push } = useRouter()
	const resetState = useResetCheckoutState()

	useEffect(() => {
		return () => {
			resetState()
		}
	}, [])

	setTimeout(() => push('/'), 3000)

	return (
		<Grid
			container
			justifyContent='center'
			alignItems='center'
			sx={{ height: '100vh' }}
		>
			<Grid item>
				<Typography variant='h3' align='center'>
					Checkout is successful
				</Typography>
			</Grid>
		</Grid>
	)
}

export const CheckoutPageTitle = ({ children }: CheckoutPageTitleProps) => (
	<>
		<Typography variant='h4' color='secondary' sx={{ marginBottom: '1rem' }}>
			{children}
		</Typography>
		<Divider />
	</>
)

const AddressShow = ({ address, name }: any) => {
	const dispatch = useAppDispatch()
	const { isCurrentAddressValid } = useGetCheckoutState()

	const fields = Object.keys(address)

	useEffect(() => {
		dispatch(setShippingAddress({ name, ...address }))

		let validAddress = true

		const keys = Object.keys(address)

		for (const key of keys) {
			if (!address[key]) {
				validAddress = false
				break
			}
		}

		dispatch(setIsCurrentAddressValid(validAddress))
	}, [])

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

			<CustomAlert
				severity='error'
				checked={!isCurrentAddressValid}
				sx={{ mt: '1rem' }}
			>
				Please set up you shipping address from your profile or use a different
				shipping address
			</CustomAlert>
		</>
	)
}

const AddressShowContainer = () => {
	const { data } = useGetMultipleProfile()
	const clearShippingAddress = useClearShippingAddress()
	const dispatch = useAppDispatch()

	useEffect(() => {
		return () => {
			clearShippingAddress()
			dispatch(setIsCurrentAddressValid(false))
		}
	}, [])

	if (!data) return null

	const {
		getMultipleProfile: [{ address, name }],
	} = data

	return <AddressShow address={address} name={name} />
}

const CheckoutPage = (props: Props) => {
	useStoreID(props)
	const clearShippingAddress = useClearShippingAddress()

	const { showDifferentAddressForm, checkoutDone } = useGetCheckoutState()

	useEffect(() => {
		return () => {
			clearShippingAddress()
		}
	}, [])

	if (checkoutDone) return <CheckoutSuccessful />

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

					{!showDifferentAddressForm && (
						<Grid container sx={{ margin: '1rem 0' }}>
							<Grid item xs={12} sx={{ marginBottom: '1rem' }}>
								<Typography variant='h5'>Current Address</Typography>
							</Grid>

							<AddressShowContainer />
						</Grid>
					)}

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
