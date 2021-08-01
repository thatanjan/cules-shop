import { CommonResponse } from 'interfaces/global'

export interface Address {
	address: string
	country: string
	postal: string
	city: string
}

export interface ProfilePictureUploadResponse {
	uploadProfilePicture: CommonResponse
}

export interface GetMultipleUserNameImage {
	getMultipleUserNameImage: Array<{
		profilePicture: string
		name: string
	}>
}

export interface GetMultipleProfileResponse {
	getMultipleProfile: Array<{
		name: string
		profilePicture: string
		address: Address
	}>
}

export interface SellerProfile {
	company: string
}
