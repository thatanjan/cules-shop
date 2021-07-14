import merge from 'lodash/merge'

import getMultipleUserNameImage from './getMultipleUserNameImage.query'
import getMyAddress from './getMyAddress.query'

import updateMyAddress from './updateMyAddress.mutation'

import typeDefs from './profile.types'

export const profileTypeDefs = [typeDefs]

export const profileResolvers = merge(
	getMultipleUserNameImage,
	getMyAddress,
	updateMyAddress
)
