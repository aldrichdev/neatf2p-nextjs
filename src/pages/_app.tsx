import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from '@mui/material/styles'
import theme from '@theme/theme'
import '@theme/styles.css'
import { Container, HomepageLink, Logo, PaddedContainer } from '@styled/App/App.styled'
import { MainNavigation } from '@atoms/MainNavigation'
import { AccountWidget } from '@atoms/AccountWidget'
import UserContextProvider from 'src/contexts/UserContext/UserContextProvider'

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
        <UserContextProvider>
          <Container>
            <AccountWidget />
            <HomepageLink href="/">
              <picture>
                <source media="(max-width: 600px)" srcSet="/img/MobileHeaderImageV3.png" />
                <Logo src="/img/HeaderImageV1.png" alt="Neat F2P" />
              </picture>
            </HomepageLink>
            <MainNavigation />
            <PaddedContainer>
              <Component {...pageProps} />
            </PaddedContainer>
          </Container>
        </UserContextProvider>
      </ThemeProvider>
    </>
  )
}