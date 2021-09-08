import React, { useState, FormEvent } from 'react'
import { useRouter } from 'next/router'
import Cookie from 'js-cookie'
import { experimentalStyled as styled, alpha } from '@material-ui/core/styles'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'

const Search = styled('form')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(1),
		width: 'auto',
	},
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '20ch',
			},
		},
	},
}))

const TopNavigationSearchBar = () => {
	const SEARCH = 'search'

	const { push } = useRouter()
	const getSearchValue = () => Cookie.get(SEARCH)
	const [input, setInput] = useState(getSearchValue() || '')

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		if (!input) return false

		const queryString = input.trim().replace(/\s/g, '+')

		Cookie.remove(SEARCH)
		setInput('')
		push(`/search?query=${queryString}`)

		return true
	}

	return (
		<Search onSubmit={handleSubmit}>
			<SearchIconWrapper>
				<SearchIcon />
			</SearchIconWrapper>
			<StyledInputBase
				placeholder='Search…'
				inputProps={{ 'aria-label': 'search', value: input }}
				onChange={e => {
					setInput(e.target.value)
					Cookie.set(SEARCH, e.target.value)
				}}
			/>
		</Search>
	)
}

export default TopNavigationSearchBar
