import React from 'react'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import LinearProgress from '@material-ui/core/LinearProgress'

interface Values {
	email: string
	password: string
}

const Login = () => {
	return (
		<Box sx={{ minHeight: '70vh' }}>
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
						alert(JSON.stringify(values, null, 2))
					}, 500)
				}}
			>
				{({ submitForm, isSubmitting }) => (
					<Form>
						<Field
							component={TextField}
							name='email'
							type='email'
							label='Email'
							variant='standard'
							fullWidth
						/>
						<br />
						<br />
						<Field
							component={TextField}
							type='password'
							label='Password'
							name='password'
							variant='standard'
							fullWidth
						/>
						{isSubmitting && <LinearProgress />}
						<br />
						<br />

						<Button
							variant='contained'
							color='primary'
							disabled={isSubmitting}
							onClick={submitForm}
							fullWidth
						>
							Submit
						</Button>
					</Form>
				)}
			</Formik>
		</Box>
	)
}

export default Login
