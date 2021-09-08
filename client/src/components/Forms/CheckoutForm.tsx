import { FormEvent } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
	CardElement,
	Elements,
	useStripe,
	useElements,
} from '@stripe/react-stripe-js'
import Button from '@material-ui/core/Button'

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
			<Button
				variant='contained'
				type='submit'
				disabled={!stripe || !elements}
				sx={{ margin: '1.5rem 0' }}
			>
				Pay
			</Button>
		</form>
	)
}

const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh')

const Checkout = () => (
	<>
		<Elements stripe={stripePromise}>
			<CheckoutForm />
		</Elements>
	</>
)

export default Checkout
