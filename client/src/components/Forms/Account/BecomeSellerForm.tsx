import { useState } from 'react'
import { useRouter } from 'next/router'
import { Formik, Form, Field, FieldAttributes } from 'formik'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'
import { TextField } from 'formik-material-ui'
import Box from '@material-ui/core/Box'

import { SellerProfile } from 'interfaces/profile'

import CustomField from 'components/Forms/Account/CustomField'

const initialValues: SellerProfile = { company: '' }

const BecomeSellerForm = () => {
	return (
		<Box sx={{ width: '100%' }}>
			<Formik
				initialValues={initialValues}
				validate={values => {
					const errors: Partial<SellerProfile> = {}
					return errors
				}}
				onSubmit={(values, { setSubmitting }) => {
					setTimeout(() => {
						setSubmitting(false)
						alert(JSON.stringify(values, null, 2))
					}, 500)
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
