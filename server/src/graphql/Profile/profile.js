import merge from 'lodash/merge'

import getMultipleUserNameImage from './getMultipleUserNameImage.query'
import getMyAddress from './getMyAddress.query'

import updateMyAddress from './updateMyAddress.mutation'
import profilePictureMutation from './profilePicture.mutation'

import typeDefs from './profile.types'

export const profileTypeDefs = [typeDefs]

export const profileResolvers = merge(
	getMultipleUserNameImage,
	getMyAddress,
	updateMyAddress,
	profilePictureMutation
)
