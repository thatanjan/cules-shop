import merge from 'lodash/merge'

import getMultipleUserNameImage from './getMultipleUserNameImage.query'
import getMyAddress from './getMyAddress.query'
import getMultipleProfile from './getMultipleProfile.query'

import updateProfile from './updateProfile.mutation'
import profilePictureMutation from './profilePicture.mutation'

import typeDefs from './profile.types'

export const profileTypeDefs = [typeDefs]

export const profileResolvers = merge(
	getMultipleUserNameImage,
	getMyAddress,
	updateProfile,
	profilePictureMutation,
	getMultipleProfile
)
