import type { AppProps } from 'next/app'
import React from 'react'
import Head from 'next/head'

import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import AppLayout from 'components/Layouts/AppLayout'

import darkTheme from 'themes/darkTheme'

export default function MyApp(props: AppProps) {
	const { Component, pageProps } = props

	React.useEffect(() => {
		// Remove the server-side injected CSS.
		const jssStyles: any = document.querySelector('#jss-server-side')
		if (jssStyles) {
			jssStyles.parentElement.removeChild(jssStyles)
		}
	}, [])

	return (
		<>
			<Head>
				<title>Cules Shop</title>
				<meta
					name='viewport'
					content='minimum-scale=1, initial-scale=1, width=device-width'
				/>
			</Head>

			<ThemeProvider theme={darkTheme}>
				<CssBaseline />
				<AppLayout>
					<Component {...pageProps} />
				</AppLayout>
			</ThemeProvider>
		</>
	)
}
