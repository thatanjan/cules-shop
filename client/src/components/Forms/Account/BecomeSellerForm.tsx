import { useState } from 'react'
import { useRouter } from 'next/router'
import { Formik, Form, Field, FieldAttributes } from 'formik'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'
import Box from '@material-ui/core/Box'

import { SellerProfile } from 'interfaces/profile'
import { CommonResponse } from 'interfaces/global'

import CustomField from 'components/Forms/Account/CustomField'
import CustomAlert from 'components/Alerts/CustomAlert'

import createRequest from 'graphql/createRequest'

import { becomeSeller } from 'graphql/mutations/profileMutations'

const initialValues: SellerProfile = { company: '' }

const BecomeSellerForm = () => {
	const [alertMessage, setAlertMessage] = useState('')
	const { push } = useRouter()

	return (
		<Box sx={{ width: '100%', margin: '2rem 0' }}>
			{alertMessage && (
				<CustomAlert
					checked
					variant='filled'
					severity='error'
					sx={{ margin: '1rem 0' }}
					onClose={() => {
						setAlertMessage('')
					}}
				>
					{alertMessage}
				</CustomAlert>
			)}

			<Formik
				initialValues={initialValues}
				validate={values => {
					const errors: Partial<SellerProfile> = {}
					return errors
				}}
				onSubmit={async (values, { setSubmitting }) => {
					try {
						const {
							becomeSeller: { success, errorMessage },
						} = await createRequest<SellerProfile, { becomeSeller: CommonResponse }>({
							values,
							key: becomeSeller,
						})

						if (success) {
							setSubmitting(false)
							push('/account')
						}

						if (errorMessage) {
							setSubmitting(false)
							setAlertMessage(errorMessage)
						}
					} catch (error) {
						setAlertMessage(error.response.errors[0].message)
						setTimeout(() => {
							setAlertMessage('')
						}, 3000)

						setSubmitting(false)
					}
				}}
			>
				{({ submitForm, isSubmitting }) => (
					<Form>
						<CustomField name='company' label='Company Name' />

						{isSubmitting && <LinearProgress />}
						<br />
						<Button
							variant='contained'
							color='primary'
							disabled={isSubmitting}
							onClick={submitForm}
						>
							Become a Seller
						</Button>
					</Form>
				)}
			</Formik>
		</Box>
	)
}

export default BecomeSellerForm
