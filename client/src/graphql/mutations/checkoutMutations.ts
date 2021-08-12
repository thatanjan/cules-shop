import { gql } from 'graphql-request'

export const checkout = gql`
	mutation checkout(
		$productID: ID!
		$categoryID: ID!
		$userQuantity: Int!
		$stripeID: ID!
	) {
		checkout(
			Input: {
				products: [
					{
						productID: $productID
						categoryID: $categoryID
						userQuantity: $userQuantity
					}
				]
				shippingAddress: {
					country: $country
					city: $city
					postal: $postal
					address: $address
				}
				stripeID: $stripeID
			}
		) {
			success
			errorMessage
		}
	}
`
