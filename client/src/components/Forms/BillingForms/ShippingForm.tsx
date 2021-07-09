import React from 'react'
import { Formik, Form, Field, FieldAttributes } from 'formik'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'
import { TextField } from 'formik-material-ui'

import useSetShippingAddress from 'redux/hooks/checkout/useSetShippingAddress'

export interface Values {
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

interface CustomFieldProps extends FieldAttributes<any> {
	component?: React.ComponentType
	name: string
	label: string
	type?: string
}

const CustomField = ({
	component,
	label,
	type,
	name,
	...props
}: CustomFieldProps) => {
	return (
		<Field
			{...{ name, label, ...props }}
			component={component || TextField}
			type={type || 'text'}
			sx={{ marginBottom: '1rem' }}
			fullWidth
			variant='standard'
		/>
	)
}

const ShippingForm = () => {
	const setShippingAddress = useSetShippingAddress()

	return (
		<Formik
			initialValues={{
				email: '',
				firstName: '',
				secondName: '',
				country: '',
				streetAddress1: '',
				streetAddress2: '',
				cityTown: '',
				state: '',
				zip: '',
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
					setShippingAddress(values)
				}, 500)
			}}
		>
			{({ submitForm, isSubmitting }) => (
				<Form>
					<CustomField
						component={TextField}
						name='firstName'
						type='text'
						label='First Name'
						required
					/>

					<CustomField
						component={TextField}
						name='secondName'
						type='text'
						label='Second Name'
						required
					/>

					<CustomField
						component={TextField}
						name='streetAddress1'
						type='text'
						label='Street Address 1'
						required
					/>

					<CustomField
						component={TextField}
						name='streetAddress2'
						type='text'
						label='Street Address 2'
						required
					/>

					<CustomField
						component={TextField}
						name='cityTown'
						type='text'
						label='City / Town'
						required
					/>

					<CustomField
						component={TextField}
						name='state'
						type='text'
						label='State'
					/>

					<CustomField component={TextField} name='zip' type='text' label='Zip' />

					<CustomField
						component={TextField}
						name='email'
						type='email'
						label='Email'
						required
					/>

					{isSubmitting && <LinearProgress />}

					<Button
						variant='contained'
						color='primary'
						disabled={isSubmitting}
						onClick={submitForm}
						sx={{ margin: '1rem 0', padding: { sm: { padding: '1rem' } } }}
						fullWidth
					>
						Done
					</Button>
				</Form>
			)}
		</Formik>
	)
}

export default ShippingForm
