import merge from 'lodash/merge'

import { userResolvers } from 'graphql/User/user'

const resolvers = merge(userResolvers)

export default resolvers
