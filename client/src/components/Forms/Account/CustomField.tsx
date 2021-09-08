import { Field, FieldAttributes } from 'formik'
import { TextField } from 'formik-material-ui'

interface CustomFieldProps extends FieldAttributes<any> {
	name: string
	label: string
}

const CustomField = ({ label, name, ...props }: CustomFieldProps) => {
	return (
		<Field
			{...{ name, label, ...props }}
			component={TextField}
			type='text'
			sx={{ marginBottom: '1rem', ...props.sx }}
			fullWidth
			variant='standard'
		/>
	)
}

export default CustomField
