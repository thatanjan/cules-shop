import { gql } from 'graphql-request'

export const checkout = gql`
	mutation checkout(
		$products: [CheckoutProduct!]
		$shippingDetails: ShippingInput!
		$stripeID: ID!
	) {
		checkout(
			Input: {
				products: $products
				shippingDetails: $shippingDetails
				stripeID: $stripeID
			}
		) {
			success
			errorMessage
		}
	}
`
// export const checkout = gql`
// 	mutation checkout(
// 		$products: [CheckoutProduct!]
// 		$productID: ID!
// 		$categoryID: ID!
// 		$userQuantity: Int!
// 		$name: String!
// 		$country: String!
// 		$city: String!
// 		$postal: String!
// 		$address: String!
// 		$stripeID: ID!
// 	) {
// 		checkout(
// 			Input: {
// 				products: [
// 					{
// 						productID: $productID
// 						categoryID: $categoryID
// 						userQuantity: $userQuantity
// 					}
// 				]
// 				shippingDetails: {
// 					country: $country
// 					city: $city
// 					postal: $postal
// 					address: $address
// 					name: $name
// 				}
// 				stripeID: $stripeID
// 			}
// 		) {
// 			success
// 			errorMessage
// 		}
// 	}
// `
