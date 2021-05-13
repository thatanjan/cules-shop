import merge from 'lodash/merge'

import { userResolvers } from 'graphql/User/user'
import { productResolvers } from 'graphql/Product/product'

const resolvers = merge(userResolvers, productResolvers)

export default resolvers
