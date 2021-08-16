import { FormEvent, useState } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
	CardElement,
	Elements,
	useStripe,
	useElements,
} from '@stripe/react-stripe-js'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'

import CustomAlert from 'components/Alerts/CustomAlert'

import createRequest from 'graphql/createRequest'

import { checkout } from 'graphql/mutations/checkoutMutations'

import {
	useGetCheckoutState,
	useSetCheckoutDone,
} from 'redux/hooks/useCheckoutHooks'

const CheckoutForm = () => {
	const stripe = useStripe()
	const elements = useElements()
	const [errorMessage, setErrorMessage] = useState('')
	const [checkingOut, setCheckingOut] = useState(false)
	const setCheckoutDone = useSetCheckoutDone()

	const {
		shippingValues,
		isNewAddressValid,
		isCurrentAddressValid,
		showDifferentAddressForm,
	} = useGetCheckoutState()

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		if (elements == null) {
			return
		}

		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card: elements.getElement(CardElement),
		})

		if (error) {
			setErrorMessage(error.message)
			setTimeout(() => {
				setErrorMessage('')
			}, 3000)
			return false
		}

		const { id } = paymentMethod

		const request = await createRequest({
			key: checkout,
			values: {
				stripeID: id,
				shippingDetails: shippingValues,
			},
		})
		setCheckingOut(true)

		if (request) {
			setCheckingOut(false)
			setCheckoutDone()
		}
	}

	return (
		<>
			<form onSubmit={handleSubmit}>
				<CardElement
					options={{
						style: {
							base: {
								fontSize: '1.5rem',
								color: 'white',
							},
						},
					}}
				/>

				{checkingOut && <LinearProgress sx={{ mt: '1rem' }} />}

				<Button
					variant='contained'
					type='submit'
					disabled={
						!stripe ||
						!elements ||
						checkingOut ||
						(showDifferentAddressForm && !isNewAddressValid) ||
						!isCurrentAddressValid
					}
					sx={{ margin: '1.5rem 0' }}
				>
					Pay
				</Button>
			</form>

			{errorMessage && (
				<CustomAlert checked severity='error'>
					{errorMessage}
				</CustomAlert>
			)}
		</>
	)
}

const stripePromise = loadStripe(
	'pk_test_51J4gFKKMP47A4jh0PLmYH5uTFG91ABInhXU6tADls29Ep2952EGvyYuMXBfAx0vf1oAaSYblaWVNEkHr4UiFx6EV00uuQOy4HE'
)

const Checkout = () => (
	<>
		<Elements stripe={stripePromise}>
			<CheckoutForm />
		</Elements>
	</>
)

export default Checkout
