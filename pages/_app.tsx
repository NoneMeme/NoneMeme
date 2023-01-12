import * as React from 'react';

import Head from 'next/head';

import useMediaQuery from '@mui/material/useMediaQuery';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
	const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

	const theme = React.useMemo(
		() => createTheme({
			palette: {
				mode: prefersDarkMode ? 'dark' : 'light',
			},
		}),
		[prefersDarkMode],
	);

	return (
		<>
			<Head>
				<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
			</Head>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
}
