import React, { useState, FormEvent } from 'react'
import { useRouter } from 'next/router'
import Cookie from 'js-cookie'
import InputBase from '@material-ui/core/InputBase'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'
import ClearIcon from '@material-ui/icons/Clear'

const SearchBar = () => {
	const { push } = useRouter()
	const getSearchValue = () => Cookie.get(SEARCH)
	const [input, setInput] = useState(getSearchValue || '')

	const SEARCH = 'search'

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		if (!input) return false

		const queryString = input.trim().replace(/\s/g, '+')

		Cookie.remove(SEARCH)
		push(`/search?query=${queryString}`)

		return true
	}

	const placeholder = 'Search your products'
	return (
		<Paper
			component='form'
			sx={{
				p: '.5rem 1rem',
				display: 'flex',
				alignItems: 'center',
				marginTop: { xs: '56px', sm: '64px' },
			}}
			square
			onSubmit={handleSubmit}
		>
			<InputBase
				sx={{ ml: 1, flex: 1 }}
				placeholder={placeholder}
				inputProps={{ 'aria-label': placeholder, value: getSearchValue() }}
				onChange={e => {
					setInput(e.target.value)
					Cookie.set(SEARCH, e.target.value)
				}}
			/>

			<IconButton type='submit' sx={{ p: '10px' }} aria-label='search'>
				<SearchIcon />
			</IconButton>

			<Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />

			<IconButton
				sx={{ p: '10px' }}
				aria-label='clear text'
				onClick={() => {
					setInput('')
					Cookie.set(SEARCH, '')
				}}
			>
				<ClearIcon />
			</IconButton>
		</Paper>
	)
}

export default SearchBar
