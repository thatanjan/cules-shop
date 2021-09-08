import { CommonResponse } from 'interfaces/global'

export interface ProfilePictureUploadResponse {
	uploadProfilePicture: CommonResponse
}

export interface GetMultipleUserNameImage {
	getMultipleUserNameImage: Array<{
		name: string
		image: string
	}>
}
