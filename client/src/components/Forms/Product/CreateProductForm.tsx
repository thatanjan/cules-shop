import { useState, ChangeEvent } from 'react'
import { useRouter } from 'next/router'
import { Formik, Form, Field, FieldAttributes } from 'formik'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

import Box from '@material-ui/core/Box'

import { CommonResponse } from 'interfaces/global'

import CustomField from 'components/Forms/Account/CustomField'
import CustomAlert from 'components/Alerts/CustomAlert'

import createRequest from 'graphql/createRequest'

import { becomeSeller } from 'graphql/mutations/profileMutations'

interface Input {
	name: string
	shortDescription: string
	description: string
	quantity: number
	category: string
}

const initialValues: Input = {
	name: '',
	shortDescription: '',
	description: '',
	quantity: 0,
	category: '',
}

interface SelectCategoryProps {
	category: string
	setCategory: Function
}

const SelectCategory = ({ category, setCategory }: SelectCategoryProps) => {
	const categories = [{ label: 'Electronics', value: '12121212121' }]
	const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
		setCategory(event.target.value as string)
	}

	return (
		<CustomField
			select
			value={category}
			onChange={handleChange}
			label='Category'
			variant='filled'
			name='category'
		>
			{categories.map(option => (
				<MenuItem key={option.value} value={option.value}>
					{option.label}
				</MenuItem>
			))}
		</CustomField>
	)
}

const CreateProductForm = () => {
	const [category, setCategory] = useState('')
	const [alertMessage, setAlertMessage] = useState('')
	const { push } = useRouter()

	return (
		<Box sx={{ width: '100%', margin: '2rem 0' }}>
			{alertMessage && (
				<CustomAlert
					checked
					variant='filled'
					severity='error'
					sx={{ margin: '1rem 0' }}
					onClose={() => {
						setAlertMessage('')
					}}
				>
					{alertMessage}
				</CustomAlert>
			)}

			<Formik
				initialValues={initialValues}
				validate={values => {
					const errors: Partial<Input> = {}
					return errors
				}}
				onSubmit={async (values, { setSubmitting }) => {
					values.category = category

					console.log(values)
					if (true) return true

					try {
						const {
							becomeSeller: { success, errorMessage },
						} = await createRequest<Input, { becomeSeller: CommonResponse }>({
							values,
							key: becomeSeller,
						})

						if (success) {
							setSubmitting(false)
							push('/account')
						}

						if (errorMessage) {
							setSubmitting(false)
							setAlertMessage(errorMessage)
						}
					} catch (error) {
						setAlertMessage(error.response.errors[0].message)
						setTimeout(() => {
							setAlertMessage('')
						}, 3000)

						setSubmitting(false)
					}
				}}
			>
				{({ submitForm, isSubmitting }) => (
					<Form>
						<CustomField name='name' label='Name' />

						<CustomField
							name='shortDescription'
							label='Short Description'
							multiline
							rows={2}
						/>

						<CustomField name='description' label='Description' multiline rows={4} />

						<CustomField name='quantity' label='Quantity' />

						<SelectCategory {...{ category, setCategory }} />

						{isSubmitting && <LinearProgress />}

						<br />

						<Button
							variant='contained'
							color='primary'
							disabled={isSubmitting}
							onClick={submitForm}
						>
							Create Product
						</Button>
					</Form>
				)}
			</Formik>
		</Box>
	)
}

export default CreateProductForm
