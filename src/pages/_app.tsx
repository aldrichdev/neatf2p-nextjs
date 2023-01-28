import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from '@mui/material/styles'
import theme from '@theme/theme'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'
import '@theme/styles.css'

const Container = styled('div')`
  margin: 0 10%;
  padding: 20px;
  background-color: white;
`

const Logo = styled('img')(
  ({ theme }) =>  css`
    margin: 0 auto;
    display: block;
    width: 100%;

    ${theme.breakpoints.up('desktop')} {
      width: 800px;
    }
  `
)

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>NeatF2P :: A Wholesome RSC Experience</title>
        <meta name="description" 
          content="NeatF2P is an upcoming RSC private server that is F2P-only (no members) and is 100% free." />
        <meta key="keywords" content="neatf2p, neat f2p, f2p, rsc f2p" />
      </Head>
      <ThemeProvider theme={theme}>
        <Container>
          <Logo src="/img/NeatF2PLogo.png" alt="Neat F2P" />
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    </>
  )
}