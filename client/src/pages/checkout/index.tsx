import { FormEvent } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
	CardElement,
	Elements,
	useStripe,
	useElements,
} from '@stripe/react-stripe-js'

const CheckoutForm = () => {
	const stripe = useStripe()
	const elements = useElements()

	const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		if (elements == null) {
			return
		}

		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: 'card',
			card: elements.getElement(CardElement),
		})
	}

	return (
		<form onSubmit={handleSubmit}>
			<CardElement />
			<button type='submit' disabled={!stripe || !elements}>
				Pay
			</button>
		</form>
	)
}

const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh')

const Checkout = () => (
	<Elements stripe={stripePromise}>
		<CheckoutForm />
	</Elements>
)

export default Checkout
