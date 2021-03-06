import { gql } from 'apollo-server-express'

const typeDefs = gql`
	extend type Mutation {
		addProductToCart(Input: AddProductToCartInput!): SuccessResponse!
		modifyQuantity(Input: ModifyQuantityInput!): SuccessResponse!
		removeProductFromCart(Input: RemoveProductFromCartInput): SuccessResponse!
		checkout(Input: CheckoutInput!): SuccessResponse!
	}

	extend type Query {
		isProductInTheCart(productID: ID!): Exist!
		totalCartItems: TotalCartItems!
		totalCartPrice: TotalCartPrice!
		getAllCartProducts: GetAllCartProducts!
	}

	type GetAllCartProducts {
		cartProducts: [CartProduct!]
		errorMessage: String
	}

	type CategoryName {
		name: String!
		_id: ID!
	}

	type CartProduct {
		name: String!
		image: String!
		price: Int!
		_id: ID!
		category: CategoryName!
		userQuantity: Int!
		quantity: Int!
	}

	type Exist {
		exist: Boolean
		errorMessage: String
		quantity: Int
	}

	type TotalCartPrice {
		totalPrice: Int
		errorMessage: String
	}

	type TotalCartItems {
		totalItems: Int
		errorMessage: String
	}

	input ShippingInput {
		name: String!
		country: String!
		address: String!
		city: String!
		postal: String!
	}

	input CheckoutInput {
		stripeID: ID!
		shippingDetails: ShippingInput!
	}

	input AddProductToCartInput {
		productID: ID!
		quantity: Int!
	}

	input RemoveProductFromCartInput {
		productID: ID!
	}

	input ModifyQuantityInput {
		productID: ID!
		type: String!
		amount: Int!
	}
`

export default typeDefs
