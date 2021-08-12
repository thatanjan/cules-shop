import React from 'react'
import { Formik, Form, Field, FieldAttributes } from 'formik'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'
import { TextField } from 'formik-material-ui'

import { useSetShippingAddress } from 'redux/hooks/useCheckoutHooks'

export interface Values {
	name: string
	country: string
	address: string
	city: string
	postal: string
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
				name: '',
				country: '',
				address: '',
				city: '',
				postal: '',
			}}
			validate={values => {
				const errors: Partial<Values> = {}
				setShippingAddress(values)

				return errors
			}}
			onSubmit={(values, { setSubmitting }) => {
				setTimeout(() => {
					setSubmitting(false)
				}, 500)
			}}
		>
			{({ submitForm, isSubmitting }) => (
				<Form>
					<CustomField
						component={TextField}
						name='name'
						type='text'
						label='Name'
						required
					/>

					<CustomField
						component={TextField}
						name='address'
						type='text'
						label='Address'
						required
					/>

					<CustomField
						component={TextField}
						name='city'
						type='text'
						label='City'
						required
					/>

					<CustomField
						component={TextField}
						name='country'
						type='text'
						label='Country'
						required
					/>

					<CustomField
						component={TextField}
						name='postal'
						type='text'
						label='Postal Code'
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
