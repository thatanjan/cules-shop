import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Cookie from 'js-cookie'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import Alert from '@material-ui/core/Alert'

import MuiLink from 'components/Links/MuiLink'

import { RegisterOutput, RegisterInput } from 'interfaces/authentication'

import { registerMutation } from 'graphql/mutations/authMutations'
import createRequest from 'graphql/createRequest'

import { TOKEN_NAME } from 'variables/global'

interface Values {
	name: string
	email: string
	password: string
	confirmPassword: string
}

const Login = () => {
	const { push } = useRouter()
	const [alertMessage, setAlertMessage] = useState('')

	return (
		<Box>
			<Formik
				initialValues={{
					email: '',
					password: '',
					name: '',
					confirmPassword: '',
				}}
				validate={values => {
					const errors: Partial<Values> = {}

					const { name, email, password, confirmPassword } = values

					if (!name) {
						errors.name = 'Name is required'
					} else if (name.length < 6) {
						errors.name = 'Name should be at least 6 character long'
					}

					if (!email) {
						errors.email = 'Required'
					} else if (
						!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
					) {
						errors.email = 'Invalid email address'
					}

					if (!password) {
						errors.password = 'Password is required'
					} else if (password.length < 6) {
						errors.password = 'Invalid Password'
					}

					if (password !== confirmPassword) {
						errors.confirmPassword = "Passwords doesn't match"
					}
					return errors
				}}
				onSubmit={async (values, { setSubmitting }) => {
					const {
						register: { token, errorMessage },
					} = await createRequest<RegisterInput, RegisterOutput>({
						key: registerMutation,
						values,
					})

					if (token || errorMessage) setSubmitting(false)

					if (errorMessage) {
						setAlertMessage(errorMessage)

						setTimeout(() => setAlertMessage(''), 3000)
						return false
					}

					Cookie.set(TOKEN_NAME, token)
					push('/')

					return true
				}}
			>
				{({ submitForm, isSubmitting }) => (
					<Form>
						<Field
							component={TextField}
							name='name'
							type='text'
							label='Name'
							variant='standard'
							fullWidth
							sx={{ marginBottom: '1rem' }}
						/>

						<Field
							component={TextField}
							name='email'
							type='email'
							label='Email'
							variant='standard'
							fullWidth
							sx={{ marginBottom: '1rem' }}
						/>
						<Field
							component={TextField}
							type='password'
							label='Password'
							name='password'
							variant='standard'
							fullWidth
							sx={{ marginBottom: '1rem' }}
						/>

						<Field
							component={TextField}
							type='password'
							label='Confirm Password'
							name='confirmPassword'
							variant='standard'
							fullWidth
							sx={{ marginBottom: '1rem' }}
						/>

						<Typography sx={{ marginBottom: '1rem' }}>
							Your personal data will be used to support your experience throughout
							this website, to manage access to your account, and for other purposes
							described in our privacy policy.
						</Typography>

						{isSubmitting && <LinearProgress />}

						<Button
							variant='contained'
							color='primary'
							disabled={isSubmitting}
							onClick={submitForm}
							fullWidth
							sx={{ margin: '.5rem 0' }}
						>
							Submit
						</Button>

						<MuiLink
							MuiComponent={Button}
							href='/authentication/register'
							variant='contained'
							color='primary'
							disabled={isSubmitting}
							fullWidth
						>
							Login
						</MuiLink>
					</Form>
				)}
			</Formik>

			{alertMessage && (
				<Alert
					variant='filled'
					severity='error'
					sx={{ marginTop: '1rem' }}
					onClose={() => {
						setAlertMessage('')
					}}
				>
					{alertMessage}
				</Alert>
			)}
		</Box>
	)
}

export default Login
