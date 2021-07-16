import { Formik, Form, Field, FieldAttributes } from 'formik'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'
import { TextField } from 'formik-material-ui'

import CustomAlert from 'components/Alerts/CustomAlert'

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

interface CustomFieldProps extends FieldAttributes<any> {
	name: string
	label: string
}

const CustomField = ({ label, name, ...props }: CustomFieldProps) => {
	return (
		<Field
			{...{ name, label, ...props }}
			component={TextField}
			type='text'
			sx={{ marginBottom: '1rem' }}
			fullWidth
			variant='standard'
		/>
	)
}

const AccountEditForm = () => {
	const { userID } = useUserState()
	const { data, error } = useGetMultipleProfile([userID])

	if (error)
		return <CustomAlert checked severity='error' message='Something went wrong' />

	if (!data)
		return (
			<CustomAlert checked severity='info' message='Profile data is loading' />
		)

	return (
		<Formik
			initialValues={data.getMultipleProfile[0]}
			validate={values => {
				const errors: Partial<Values> = {}
				return errors
			}}
			onSubmit={async (values, { setSubmitting }) => {
				const { name, address } = values

				const input = { name, ...address }

				const { success, errorMessage } = await createRequest<
					typeof input,
					CommonResponse
				>({
					key: updateProfile,
					values: input,
				})

				setTimeout(() => {
					setSubmitting(false)
					alert(JSON.stringify(values, null, 2))
				}, 500)
			}}
		>
			{({ submitForm, isSubmitting }) => (
				<Form>
					<CustomField name='name' label='Name' />

					<CustomField name='address.country' label='Country' />

					<CustomField name='address.city' label='City' />

					<CustomField name='address.state' label='State' />

					<CustomField name='address.zip' label='Zip' />

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
	)
}

export default AccountEditForm
