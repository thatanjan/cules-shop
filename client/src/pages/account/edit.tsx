import React, { useEffect } from 'react'
import jwtDecode from 'jwt-decode'
import { GetServerSideProps } from 'next'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'

import { UserPayload } from 'interfaces/authentication'

import checkValidJWT from 'utils/auth/checkValidJWT'

import UploadAlert, { Props as AlertProps } from 'components/Alerts/CustomAlert'
import AccountAvatar from 'components/Avatar/AccountAvatar'
import AccountEditForm from 'components/Forms/Account/AccountEditForm'
import ImageUploadModal from 'components/Modals/ImageUploadModal'
import CustomBackdrop from 'components/Loaders/CustomBackdrop'
import UploadPreviewModal from 'components/Modals/UploadPreviewModal'

import { useAppDispatch, useAppSelector } from 'redux/hooks/appHooks'
import { useStoreID } from 'redux/hooks/useUserHooks'
import { useUserState } from 'redux/hooks/useSliceHooks'

import { useGetMultipleProfile } from 'hooks/swr/useProfileHooks'

import {
	openUploadModal,
	closePreviewModal,
	uploadFile,
	closeUploadModal,
	makeBase64Image,
	openPreviewModal,
	resetState,
} from 'redux/slices/profileSlice'
import { Base64 } from 'interfaces/global'

interface Props {
	userID: string
	sellerID: string
}

const EditProfile = (props: Props) => {
	const {
		uploading,
		alertProps,
		uploadModal,
		previewModal,
		previewLink,
		successful,
		failed,
	} = useAppSelector(({ profile }) => profile.upload)

	useStoreID(props)

	const { userID } = useUserState()
	const { data, mutate } = useGetMultipleProfile([userID])

	const dispatch = useAppDispatch()

	const closeReset = () => {
		dispatch(resetState())
	}

	useEffect(() => {
		if (successful || failed) {
			mutate()
			setTimeout(() => {
				closeReset()
			}, 3000)
		}
	}, [successful, failed])

	if (!data) return <CustomBackdrop />

	const {
		getMultipleProfile: [{ name, profilePicture }],
	} = data

	const uploadModalProps = {
		closeModal: () => dispatch(closeUploadModal()),
		uploadModal,
		makeImage: (base64: Base64) => dispatch(makeBase64Image(base64)),
		openPreviewModal: (link: string) => dispatch(openPreviewModal(link)),
		closeReset,
	}

	const handleDiscard = () => {
		dispatch(closePreviewModal())
		dispatch(openUploadModal())
	}

	const handleAccept = () => {
		dispatch(uploadFile())
		dispatch(closePreviewModal())
	}

	const uploadPreviewProps = {
		previewLink,
		previewModalOpen: previewModal,
		handleDiscard,
		handleAccept,
	}

	return (
		<>
			<Grid
				container
				alignItems='center'
				sx={{
					justifyContent: { xs: 'center', sm: 'start' },
					maxWidth: '50rem',
					margin: '3rem 0',
				}}
			>
				<Grid item xs={6} sm={4}>
					<AccountAvatar name={name} src={profilePicture} />
				</Grid>

				<Grid item xs={12} sm={6} sx={{ marginTop: { xs: '1rem', sm: 0 } }}>
					<Typography variant='h2' component='h1' align='center'>
						{name}
					</Typography>

					<Box sx={{ display: 'grid', placeItems: 'center', marginTop: '1rem' }}>
						<Button variant='contained' onClick={() => dispatch(openUploadModal())}>
							Upload a Picture
						</Button>

						{uploadModal && <ImageUploadModal {...uploadModalProps} />}

						{previewModal && <UploadPreviewModal {...uploadPreviewProps} />}

						{(uploading || successful || failed) && (
							<UploadAlert {...(alertProps as AlertProps)} />
						)}
					</Box>
				</Grid>

				<AccountEditForm />
			</Grid>
		</>
	)
}

export default EditProfile

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const {
		cookies: { jwt },
	} = req

	let props = { userID: '', sellerID: '' }

	if (!jwt) return { props }

	const isValid = await checkValidJWT(jwt)

	const { userID, sellerID } = jwtDecode<UserPayload>(jwt)

	if (!isValid) return { props }

	props = { userID, sellerID: sellerID || '' }

	return { props }
}
