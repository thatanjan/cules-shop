import merge from 'lodash/merge'

import { userResolvers } from 'graphql/User/user'
import { productResolvers } from 'graphql/Product/product'
import { cartResolvers } from 'graphql/Cart/cart'
import { profileResolvers } from 'graphql/Profile/profile'

const resolvers = merge(
	userResolvers,
	productResolvers,
	cartResolvers,
	profileResolvers
)

export default resolvers
