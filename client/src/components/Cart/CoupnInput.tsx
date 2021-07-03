import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

interface Props {}

const useStyles = makeStyles({
	formContainer: {
		display: 'grid',
		gridTemplateColumns: '2fr 1fr',
		alignItems: 'center',
		gridColumnGap: '1rem',
	},
})

const CoupnInput = (props: Props) => {
	const [code, setCode] = useState('')

	const { formContainer } = useStyles()

	return (
		<form
			className={formContainer}
			onSubmit={event => {
				event.preventDefault()
				setCode('')
			}}
		>
			<TextField
				label='Coupn Code'
				variant='filled'
				value={code}
				onChange={event => setCode(event.target.value)}
				sx={{ marginBottom: '1rem', display: 'flex' }}
			/>

			<Button variant='contained' type='submit'>
				Apply Coupn
			</Button>
		</form>
	)
}

export default CoupnInput
