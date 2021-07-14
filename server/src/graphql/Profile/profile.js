import merge from 'lodash/merge'

import getMultipleUserNameImage from './getMultipleUserNameImage.query'
import getMyAddress from './getMyAddress.query'

import typeDefs from './profile.types'

export const profileTypeDefs = [typeDefs]

export const profileResolvers = merge(getMultipleUserNameImage, getMyAddress)
