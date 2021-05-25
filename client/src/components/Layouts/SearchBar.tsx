import React from 'react'
import InputBase from '@material-ui/core/InputBase'
import Paper from '@material-ui/core/Paper'
import Collapse from '@material-ui/core/Collapse'

interface Props {
	mounted: boolean
}

const SearchBar = ({ mounted }: Props) => {
	const placeholder = 'Search your products'
	return (
		<Collapse in={mounted}>
			<Paper
				component='form'
				sx={{ p: '.5rem 1rem', display: 'flex', alignItems: 'center' }}
				elevation={0}
				square
			>
				<InputBase
					sx={{ ml: 1, flex: 1 }}
					placeholder={placeholder}
					inputProps={{ 'aria-label': placeholder }}
				/>
			</Paper>
		</Collapse>
	)
}

export default SearchBar
