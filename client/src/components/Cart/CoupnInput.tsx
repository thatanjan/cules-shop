import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

interface Props {}

const CoupnInput = (props: Props) => {
	const [code, setCode] = useState('')

	return (
		<form
			onSubmit={event => {
				event.preventDefault()
				setCode('')
			}}
		>
			<TextField
				label='Coupn Code'
				variant='standard'
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
