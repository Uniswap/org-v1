import App from 'next/app'
import Head from 'next/head'

import ThemeProvider, { GlobalStyle } from '../theme'

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <Head>
          <title>Uniswap Exchange Protocol</title>
        </Head>
        <ThemeProvider>
          <>
            <GlobalStyle />
            <Component {...pageProps} />
          </>
        </ThemeProvider>
      </>
    )
  }
}
