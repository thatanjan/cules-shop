import { useState, ChangeEvent } from 'react'
import { useRouter } from 'next/router'
import { Formik, Form } from 'formik'
import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'
import MenuItem from '@material-ui/core/MenuItem'

import Box from '@material-ui/core/Box'

import { CommonResponse } from 'interfaces/global'

import CustomField from 'components/Forms/Account/CustomField'
import CustomAlert from 'components/Alerts/CustomAlert'

import createRequest from 'graphql/createRequest'
import { createProduct } from 'graphql/mutations/productMutations'

import { useGetAllCategoryNames } from 'hooks/swr/useProductHooks'

interface Input {
	name: string
	shortDescription: string
	description: string
	quantity: number
	category: string
	price: number
}

const initialValues: Input = {
	name: '',
	shortDescription: '',
	description: '',
	quantity: 0,
	category: '',
	price: 0,
}

interface SelectCategoryProps {
	category: string
	setCategory: Function
}

const SelectCategory = ({ category, setCategory }: SelectCategoryProps) => {
	const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
		setCategory(event.target.value as string)
	}

	let categories = []

	const { data } = useGetAllCategoryNames()

	if (data) {
		categories = data.getAllCategoryNames
	}

	return (
		<CustomField
			select
			value={category}
			onChange={handleChange}
			label='Category'
			variant='filled'
			name='category'
			sx={{ '& .MuiSelect-select': { textTransform: 'capitalize' } }}
		>
			{categories.map(option => (
				<MenuItem
					key={option.name}
					value={option.categoryID}
					sx={{ textTransform: 'capitalize' }}
				>
					{option.name}
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
					values.quantity = parseInt(values.quantity.toString(), 10)
					values.price = parseInt(values.price.toString(), 10)

					try {
						const {
							createProduct: { success, errorMessage },
						} = await createRequest<Input, { createProduct: CommonResponse }>({
							values,
							key: createProduct,
						})

						if (success) {
							setSubmitting(false)
							// push('/account')
						}

						if (errorMessage) {
							setSubmitting(false)
							setAlertMessage(errorMessage)

							setTimeout(() => {
								setAlertMessage('')
							}, 3000)
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

						<CustomField name='price' label='Price' />

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
