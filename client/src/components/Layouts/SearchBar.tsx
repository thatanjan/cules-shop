import React from 'react'
import InputBase from '@material-ui/core/InputBase'
import Paper from '@material-ui/core/Paper'
import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import ClearIcon from '@material-ui/icons/Clear'

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

				<IconButton type='submit' sx={{ p: '10px' }} aria-label='search'>
					<SearchIcon />
				</IconButton>

				<Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />

				<IconButton sx={{ p: '10px' }} aria-label='clear text'>
					<ClearIcon />
				</IconButton>
			</Paper>
		</Collapse>
	)
}

export default SearchBar
