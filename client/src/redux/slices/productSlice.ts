import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Props as AlertProps } from 'components/Alerts/CustomAlert'

import { Base64 } from 'interfaces/global'

export interface InitialState {
	upload: {
		uploadModal: boolean
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
		uploadModal: false,
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

const ProductSlice = createSlice({
	name: 'product',
	initialState,
	reducers: {
		openUploadModal: ({ upload }) => {
			upload.uploadModal = true
		},
		closeUploadModal: ({ upload }) => {
			upload.uploadModal = false
		},
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
		},
		makeBase64Image: ({ upload }, { payload: file }: PayloadAction<Base64>) => {
			upload.file = file
		},
		resetState: () => initialState,
	},
})

export const {
	openPreviewModal,
	closePreviewModal,
	makeBase64Image,
	resetState,
	openUploadModal,
	closeUploadModal,
} = ProductSlice.actions

export default ProductSlice.reducer
