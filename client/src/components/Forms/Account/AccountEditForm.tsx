import { useState } from 'react'
import { useRouter } from 'next/router'
import { Formik, Form } from 'formik'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'

import CustomAlert from 'components/Alerts/CustomAlert'
import CustomField from 'components/Forms/Account/CustomField'

import { useGetMultipleProfile } from 'hooks/swr/useProfileHooks'
import { useUserState } from 'redux/hooks/useSliceHooks'

import createRequest from 'graphql/createRequest'

import { updateProfile } from 'graphql/mutations/profileMutations'

import { CommonResponse } from 'interfaces/global'

interface Values {
	name: string
	address: {
		country: string
		city: string
		postal: string
		address: string
	}
}

const AccountEditForm = () => {
	const [alertMessage, setAlertMessage] = useState('')
	const { userID } = useUserState()
	const { data, error } = useGetMultipleProfile([userID])
	const { push } = useRouter()

	if (error)
		return <CustomAlert checked severity='error' message='Something went wrong' />

	if (!data)
		return (
			<CustomAlert checked severity='info' message='Profile data is loading' />
		)

	return (
		<>
			{alertMessage && (
				<CustomAlert
					checked
					variant='filled'
					severity='error'
					sx={{ marginTop: '1rem' }}
					onClose={() => {
						setAlertMessage('')
					}}
				>
					{alertMessage}
				</CustomAlert>
			)}

			<Formik
				initialValues={data.getMultipleProfile[0]}
				validate={() => {
					const errors: Partial<Values> = {}
					return errors
				}}
				onSubmit={async (values, { setSubmitting }) => {
					const { name, address } = values

					const input = { name, ...address }

					const {
						updateProfile: { success, errorMessage },
					} = await createRequest<typeof input, { updateProfile: CommonResponse }>({
						key: updateProfile,
						values: input,
					})

					if (success) {
						setSubmitting(false)
						push('/account')
					}

					if (errorMessage) {
						setSubmitting(false)
						setAlertMessage(errorMessage)
					}

					setTimeout(() => {
						setAlertMessage('')
					}, 3000)
				}}
			>
				{({ submitForm, isSubmitting }) => (
					<Form>
						<CustomField name='name' label='Name' />

						<CustomField name='address.country' label='Country' />

						<CustomField name='address.city' label='City' />

						<CustomField name='address.postal' label='Postal' />

						<CustomField name='address.address' label='Address' />

						{isSubmitting && <LinearProgress />}
						<br />
						<Button
							variant='contained'
							color='primary'
							disabled={isSubmitting}
							onClick={submitForm}
						>
							Submit
						</Button>
					</Form>
				)}
			</Formik>
		</>
	)
}

export default AccountEditForm
