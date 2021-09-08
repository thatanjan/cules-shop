import Cookie from 'js-cookie'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { TextField } from 'formik-material-ui'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import LinearProgress from '@material-ui/core/LinearProgress'
import Alert from '@material-ui/core/Alert'

import { TOKEN_NAME } from 'variables/global'

import MuiLink from 'components/Links/MuiLink'

import { LoginOutput, LoginInput } from 'interfaces/authentication'

import { loginMutation } from 'graphql/mutations/authMutations'
import createRequest from 'graphql/createRequest'

interface Values {
	email: string
	password: string
}

const Login = () => {
	const [alertMessage, setAlertMessage] = useState('')

	const { push } = useRouter()

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

					if (!values.password) {
						errors.password = 'Password is required'
					} else if (values.password.length < 6) {
						errors.password = 'Invalid Password'
					}

					return errors
				}}
				onSubmit={async (values, { setSubmitting }) => {
					const {
						login: { token, errorMessage },
					} = await createRequest<LoginInput, LoginOutput>({
						key: loginMutation,
						values,
					})

					if (token || errorMessage) setSubmitting(false)

					if (token) {
						Cookie.set(TOKEN_NAME, token)
						push('/')
						return true
					}

					if (errorMessage) {
						setAlertMessage(errorMessage)

						setTimeout(() => setAlertMessage(''), 3000)
					}

					return true
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

						<Button
							variant='contained'
							color='primary'
							disabled={isSubmitting}
							onClick={submitForm}
							fullWidth
							sx={{ margin: '1rem 0', marginBottom: '.5rem' }}
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
							Create New Account
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
