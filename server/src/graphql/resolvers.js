import merge from 'lodash/merge'

import { userResolvers } from 'graphql/User/user'
import { productResolvers } from 'graphql/Product/product'
import { cartResolvers } from 'graphql/Cart/cart'

const resolvers = merge(userResolvers, productResolvers, cartResolvers)

export default resolvers
