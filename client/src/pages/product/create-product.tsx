import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import jwtDecode from 'jwt-decode'
import { GetServerSideProps } from 'next'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import CardMedia from '@material-ui/core/CardMedia'

import CreateProductForm from 'components/Forms/Product/CreateProductForm'
import ImageUploadModal from 'components/Modals/ImageUploadModal'
import UploadPreviewModal from 'components/Modals/UploadPreviewModal'

import { UserPayload } from 'interfaces/authentication'

import checkValidJWT from 'utils/auth/checkValidJWT'

import { useStoreID } from 'redux/hooks/useUserHooks'
import { useProductState } from 'redux/hooks/useSliceHooks'
import { useAppDispatch } from 'redux/hooks/appHooks'

import {
	openUploadModal,
	closePreviewModal,
	closeUploadModal,
	makeBase64Image,
	openPreviewModal,
} from 'redux/slices/productSlice'
import { Base64 } from 'interfaces/global'

interface Props {
	userID: string
	sellerID: string
}

const CreateProduct = (props: Props) => {
	useStoreID(props)

	const [created, setCreated] = useState(false)

	useEffect(() => {
		return () => {
			setCreated(false)
		}
	}, [])

	const { uploadModal, previewModal, previewLink } = useProductState().upload

	const dispatch = useAppDispatch()

	const handleDiscard = () => {
		dispatch(closePreviewModal())
		dispatch(openUploadModal())
	}

	const handleAccept = () => {
		dispatch(closePreviewModal())
	}

	const uploadPreviewProps = {
		previewLink,
		previewModalOpen: previewModal,
		handleDiscard,
		handleAccept,
	}

	const uploadModalProps = {
		closeModal: () => dispatch(closeUploadModal()),
		uploadModal,
		makeImage: (base64: Base64) => dispatch(makeBase64Image(base64)),
		openPreviewModal: (link: string) => dispatch(openPreviewModal(link)),
		closeReset: () => {},
	}

	if (created)
		return (
			<Grid
				sx={{ height: '100vh' }}
				container
				justifyItems='center'
				alignItems='center'
			>
				<Grid item xs={12}>
					<Typography align='center' variant='h3'>
						Product Created Successfully
					</Typography>
				</Grid>
			</Grid>
		)

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
				{!created && (
					<Grid container item xs={12}>
						<Grid item xs={12} sm={8}>
							{previewLink && (
								<CardMedia
									image={previewLink}
									sx={{ height: { xs: '12rem', sm: '25rem' } }}
								/>
							)}
						</Grid>

						<Grid item xs={12} sm={8}>
							<Button
								variant='contained'
								sx={{ margin: '1rem 0' }}
								onClick={() => dispatch(openUploadModal())}
							>
								Upload a Image
							</Button>
						</Grid>

						{uploadModal && <ImageUploadModal {...uploadModalProps} />}

						{previewModal && <UploadPreviewModal {...uploadPreviewProps} />}
					</Grid>
				)}

				<Grid item xs={12}>
					{!created && <CreateProductForm setCreated={setCreated} />}
				</Grid>
			</Grid>
		</>
	)
}

export default CreateProduct

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const {
		cookies: { jwt },
	} = req

	let props = { userID: '', sellerID: '' }

	if (!jwt) return { props }

	const isValid = await checkValidJWT(jwt)

	if (!isValid) return { props }

	const { userID, sellerID } = jwtDecode<UserPayload>(jwt)

	if (!sellerID)
		return { redirect: { destination: '/account', permanent: false } }

	props = { userID, sellerID: sellerID || '' }

	return { props }
}
