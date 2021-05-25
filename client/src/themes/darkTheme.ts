import { createTheme } from '@material-ui/core/styles'

const theme = createTheme({
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

export default theme
