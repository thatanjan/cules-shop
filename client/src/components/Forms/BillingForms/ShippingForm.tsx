import { Formik, Form, Field } from 'formik'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'
import { TextField } from 'formik-material-ui'

interface Values {
	firstName: string
	secondName: string
	email: string
	country: string
	streetAddress1: string
	streetAddress2: string
	cityTown: string
	state: string
	zip: string
}

const ShippingForm = () => {
	return (
		<Formik
			initialValues={{
				email: '',
				password: '',
			}}
			validate={values => {
				const errors: Partial<Values> = {}
				if (!values.email) {
					errors.email = 'Required'
				} else if (
					!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
				) {
					errors.email = 'Invalid email address'
				}
				return errors
			}}
			onSubmit={(values, { setSubmitting }) => {
				setTimeout(() => {
					setSubmitting(false)
					console.log(values)
				}, 500)
			}}
		>
			{({ submitForm, isSubmitting }) => (
				<Form>
					<Field component={TextField} name='email' type='email' label='Email' />
					<br />
					<Field
						component={TextField}
						type='password'
						label='Password'
						name='password'
					/>
					{isSubmitting && <LinearProgress />}
					<br />
					<Button
						variant='contained'
						color='primary'
						disabled={isSubmitting}
						onClick={submitForm}
					>
						Done
					</Button>
				</Form>
			)}
		</Formik>
	)
}

export default ShippingForm
