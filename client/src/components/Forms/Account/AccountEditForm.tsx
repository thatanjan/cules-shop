import { Formik, Form, Field, FieldAttributes } from 'formik'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'
import { TextField } from 'formik-material-ui'

interface Values {
	name: string
	address: {
		country: string
		city: string
		postal: string
		address: string
	}
}

const initialValues: Values = {
	name: '',
	address: {
		country: '',
		city: '',
		postal: '',
		address: '',
	},
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
	return (
		<Formik
			initialValues={initialValues}
			validate={values => {
				const errors: Partial<Values> = {}
				return errors
			}}
			onSubmit={(values, { setSubmitting }) => {
				console.log(values)
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
