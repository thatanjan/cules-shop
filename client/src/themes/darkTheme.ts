import { createTheme, responsiveFontSizes } from '@material-ui/core/styles'

// eslint-disable-next-line
let theme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			light: '#df6843',
			main: '#ff3c00',
			dark: '#972e0e',
		},
		secondary: {
			light: '#015f92',
			main: '#0288d1',
			dark: '#349fda',
		},
		background: {
			paper: '#121212',
		},
	},
})

theme = responsiveFontSizes(theme)

theme.components.MuiButton = {
	...theme.components.MuiButton,
	styleOverrides: {
		root: {
			[theme.breakpoints.down('sm')]: { padding: '.4rem 2rem' },
		},
	},
}

export default theme
