import createRequest from 'graphql/createRequest'
import { uploadProfilePicture } from 'graphql/mutations/profileMutations'
import { RootState } from 'redux/stores/mainStore'

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Props as AlertProps } from 'components/Alerts/CustomAlert'

import { ProfilePictureUploadResponse } from 'interfaces/profile'
import { Base64 } from 'interfaces/global'

export interface InitialState {
	previewLink: string
	previewModal: boolean
	file: Base64
	uploading: boolean
	successful: boolean
	failed: boolean
	alertProps: AlertProps | {}
}

const initialState: InitialState = {
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
}

export const uploadFile = createAsyncThunk(
	'profilePictureUpload/uploadFileStatus',
	async (_, { getState }) => {
		const state = getState() as RootState

		const image = state.profile.file

		return createRequest<{ image: Base64 }, ProfilePictureUploadResponse>({
			key: uploadProfilePicture,
			values: { image },
		})
	}
)

const profilePictureUploadSlice = createSlice({
	name: 'profilePictureUpload',
	initialState,
	reducers: {
		openPreviewModal: (
			state,
			{ payload: previewLink }: PayloadAction<string>
		) => {
			state.previewLink = previewLink
			state.previewModal = true
		},
		closePreviewModal: state => {
			state.previewLink = ''
			state.previewModal = false
			state.file = null
		},
		makeBase64Image: (state, { payload: file }: PayloadAction<Base64>) => {
			state.file = file
		},
		resetState: () => initialState,
	},
	extraReducers: builder => {
		builder
			.addCase(uploadFile.pending, state => {
				state.uploading = true

				state.alertProps = {
					severity: 'info',
					message: 'Profile picture is uploading',
					checked: true,
				}
			})

			.addCase(uploadFile.fulfilled, (state, { payload }) => {
				state.uploading = false
				state.successful = true

				const data = payload.uploadProfilePicture

				if (data.success) {
					state.alertProps = {
						severity: 'success',
						message: data.message,
						checked: true,
					}
				}

				if (data.errorMessage) {
					state.alertProps = {
						severity: 'error',
						message: data.errorMessage,
						checked: true,
					}
				}
			})
			.addCase(uploadFile.rejected, state => {
				state.uploading = false
				state.failed = true

				state.alertProps = {
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
