import React, { useEffect } from 'react'
import { Formik, Form, Field, FieldAttributes } from 'formik'
import { TextField } from 'formik-material-ui'

import { useAppDispatch } from 'redux/hooks/appHooks'
import {
	useSetShippingAddress,
	useClearShippingAddress,
} from 'redux/hooks/useCheckoutHooks'
import { setIsNewAddressValid } from 'redux/slices/checkoutSlices'

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
	const dispatch = useAppDispatch()
	const clearShippingAddress = useClearShippingAddress()

	useEffect(() => {
		dispatch(setIsNewAddressValid(false))
		return () => {
			dispatch(setIsNewAddressValid(false))
			clearShippingAddress()
		}
	}, [])

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

				for (let key in values) {
					if (values[key]) {
						dispatch(setIsNewAddressValid(true))
					} else {
						dispatch(setIsNewAddressValid(false))
						break
					}
				}

				return errors
			}}
			onSubmit={() => {}}
		>
			{() => (
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
				</Form>
			)}
		</Formik>
	)
}

export default ShippingForm
