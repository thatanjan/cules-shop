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

import { useProductState } from 'redux/hooks/useSliceHooks'
import { useAppDispatch } from 'redux/hooks/appHooks'

import { useGetAllCategoryNames } from 'hooks/swr/useProductHooks'

import { resetState } from 'redux/slices/productSlice'

import { Base64 } from 'interfaces/global'

interface Input {
	name: string
	shortDescription: string
	description: string
	quantity: string
	category: string
	price: string
}

interface RequestInput {
	name: string
	shortDescription: string
	description: string
	quantity: number
	category: string
	price: number
	image: Base64
}

const initialValues: Input = {
	name: '',
	shortDescription: '',
	description: '',
	quantity: '0',
	category: '',
	price: '0',
}

interface SelectCategoryProps {
	category: string
	setCategory: Function
}

const SelectCategory = ({ category, setCategory }: SelectCategoryProps) => {
	const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
		setCategory(event.target.value as string)
	}

	const { data } = useGetAllCategoryNames()

	console.log(data)
	if (!data) return null

	const {
		getAllCategoryNames: { categories },
	} = data

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
					value={option._id}
					sx={{ textTransform: 'capitalize' }}
				>
					{option.name}
				</MenuItem>
			))}
		</CustomField>
	)
}

interface Props {
	setCreated: Function
}

interface Response extends CommonResponse {
	productID: string
}

const CreateProductForm = ({ setCreated }: Props) => {
	const [category, setCategory] = useState('')
	const [alertMessage, setAlertMessage] = useState('')
	const dispatch = useAppDispatch()
	const { push } = useRouter()

	const { file } = useProductState().upload

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
					const { name, shortDescription, description, quantity, price } = values

					const isLessThan = (value: string, toMatch: number) =>
						value.length <= toMatch

					if (isLessThan(name, 6))
						errors.name = 'Name must be at least 6 characters long'

					if (isLessThan(shortDescription, 10))
						errors.shortDescription =
							'Short Description must be at least 10 characters long'

					if (isLessThan(description, 20))
						errors.description = 'Description must be at least 20 characters long'

					if (parseInt(quantity, 10) < 1)
						errors.quantity = 'At least one product must be available'

					if (parseInt(price, 10) < 0.25)
						errors.price = 'Price must be greater than $0.25'

					if (!category) errors.category = 'Category must be set to a category'

					return errors
				}}
				onSubmit={async (
					{ quantity, price, description, name, shortDescription },
					{ setSubmitting }
				) => {
					const newValues: RequestInput = {
						category,
						quantity: parseInt(quantity.toString(), 10),
						price: parseInt(price.toString(), 10) * 100,
						image: file,
						description,
						shortDescription,
						name,
					}
					console.log(newValues)

					try {
						const {
							createProduct: { success, productID, errorMessage },
						} = await createRequest<RequestInput, { createProduct: Response }>({
							values: newValues,
							key: createProduct,
						})

						if (success) {
							setSubmitting(false)
							dispatch(resetState())
							setCreated(true)

							setTimeout(() => {
								push(`/product/${productID}`)
							}, 2000)
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

						<CustomField name='price' label='Price $' />

						<SelectCategory {...{ category, setCategory }} />

						{isSubmitting && <LinearProgress />}

						<br />

						<Button
							variant='contained'
							color='primary'
							disabled={isSubmitting || !file}
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
