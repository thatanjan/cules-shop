import { gql } from 'graphql-request'

export const checkout = gql`
	mutation checkout($shippingDetails: ShippingInput!, $stripeID: ID!) {
		checkout(Input: { shippingDetails: $shippingDetails, stripeID: $stripeID }) {
			success
			errorMessage
		}
	}
`
