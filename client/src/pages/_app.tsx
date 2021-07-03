import type { AppProps } from 'next/app'
import React from 'react'
import Head from 'next/head'
import { Provider as ReduxStoreProvider } from 'react-redux'

import ReduxStore from 'redux/stores/mainStore'

import { ThemeProvider } from '@material-ui/styles'
import CssBaseline from '@material-ui/core/CssBaseline'

import AppLayout from 'components/Layouts/AppLayout'

import darkTheme from 'themes/darkTheme'
import { APP_TITLE } from 'variables/global'

import '../../styles/globals.css'

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
				<title>{APP_TITLE}</title>
				<meta
					name='viewport'
					content='minimum-scale=1, initial-scale=1, width=device-width'
				/>
			</Head>

			<ReduxStoreProvider store={ReduxStore}>
				<ThemeProvider theme={darkTheme}>
					<CssBaseline />
					<AppLayout>
						<Component {...pageProps} />
					</AppLayout>
				</ThemeProvider>
			</ReduxStoreProvider>
		</>
	)
}
