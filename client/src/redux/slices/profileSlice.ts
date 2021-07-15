import createRequest from 'graphql/createRequest'
import { uploadProfilePicture } from 'graphql/mutations/profileMutations'
import { RootState } from 'redux/stores/mainStore'

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Props as AlertProps } from 'components/Alerts/CustomAlert'

import { ProfilePictureUploadResponse } from 'interfaces/profile'
import { Base64 } from 'interfaces/global'

export interface InitialState {
	upload: {
		previewLink: string
		previewModal: boolean
		file: Base64
		uploading: boolean
		successful: boolean
		failed: boolean
		alertProps: AlertProps | {}
	}
}

const initialState: InitialState = {
	upload: {
		previewLink: '',
		previewModal: false,
		file: null,
		uploading: false,
		successful: false,
		failed: false,
		alertProps: {
			severity: 'info',
			message: '',
			checked: false,
		},
	},
}

export const uploadFile = createAsyncThunk(
	'profilePictureUpload/uploadFileStatus',
	async (_, { getState }) => {
		const {
			profile: {
				upload: { file },
			},
		} = getState() as RootState

		return createRequest<{ image: Base64 }, ProfilePictureUploadResponse>({
			key: uploadProfilePicture,
			values: { image: file },
		})
	}
)

const profilePictureUploadSlice = createSlice({
	name: 'profilePictureUpload',
	initialState,
	reducers: {
		openPreviewModal: (
			{ upload },
			{ payload: previewLink }: PayloadAction<string>
		) => {
			upload.previewLink = previewLink
			upload.previewModal = true
		},
		closePreviewModal: ({ upload }) => {
			upload.previewLink = ''
			upload.previewModal = false
			upload.file = null
		},
		makeBase64Image: ({ upload }, { payload: file }: PayloadAction<Base64>) => {
			upload.file = file
		},
		resetState: () => initialState,
	},
	extraReducers: builder => {
		builder
			.addCase(uploadFile.pending, ({ upload }) => {
				upload.uploading = true

				upload.alertProps = {
					severity: 'info',
					message: 'Profile picture is uploading',
					checked: true,
				}
			})

			.addCase(uploadFile.fulfilled, ({ upload }, { payload }) => {
				upload.uploading = false
				upload.successful = true

				const data = payload.uploadProfilePicture

				if (data.success) {
					upload.alertProps = {
						severity: 'success',
						message: data.message,
						checked: true,
					}
				}

				if (data.errorMessage) {
					upload.alertProps = {
						severity: 'error',
						message: data.errorMessage,
						checked: true,
					}
				}
			})
			.addCase(uploadFile.rejected, ({ upload }) => {
				upload.uploading = false
				upload.failed = true

				upload.alertProps = {
					severity: 'error',
					message: 'Something went wrong. Please try again',
					checked: true,
				}
			})
	},
})

export const {
	openPreviewModal,
	closePreviewModal,
	makeBase64Image,
	resetState,
} = profilePictureUploadSlice.actions

export default profilePictureUploadSlice.reducer
