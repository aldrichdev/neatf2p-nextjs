import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from '@mui/material/styles'
import theme from '@theme/theme'
import '@theme/styles.css'
import { Container, HomepageLink, Logo, PaddedContainer } from './_app.styled'
import { MainNavigation } from '@molecules/MainNavigation'

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
          <HomepageLink href="/">
            <picture>
              <source media="(max-width: 600px)" srcSet="/img/NeatF2PLogo-Mobile.png" />
              <Logo src="/img/NeatF2PLogo.png" alt="Neat F2P" />
            </picture>
          </HomepageLink>
          <MainNavigation />
          <PaddedContainer>
            <Component {...pageProps} />
          </PaddedContainer>
        </Container>
      </ThemeProvider>
    </>
  )
}