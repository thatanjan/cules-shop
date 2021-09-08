import { gql } from 'graphql-request'

// eslint-disable-next-line import/prefer-default-export
export const checkout = gql`
	mutation checkout($shippingDetails: ShippingInput!, $stripeID: ID!) {
		checkout(Input: { shippingDetails: $shippingDetails, stripeID: $stripeID }) {
			success
			errorMessage
		}
	}
`
