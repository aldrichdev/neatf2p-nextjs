import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from '@mui/material/styles'
import theme from '@theme/theme'
import '@theme/styles.css'
import { Container, HomepageLink, Logo, PaddedContainer } from '@styledPages/App.styled'
import { MainNavigation } from '@atoms/MainNavigation'
import { AccountWidget } from '@molecules/AccountWidget'
import useAuthentication from '@hooks/useAuthentication'
import emailjs from '@emailjs/browser'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  const user = useAuthentication()
  const router = useRouter()
  const isWebclientPage = router.asPath === '/webclient'

  useEffect(() => emailjs.init('NnydzXPqox79rXZ4M'), [])

  return (
    <>
      <Head>
        <title>Neat F2P :: Nostalgia Reborn | Runescape Classic F2P</title>
        <meta
          name='description'
          content='Neat F2P is an upcoming Runescape Classic (RSC) private server that is F2P only (no members) and is 100% free.'
        />
        <meta
          key='keywords'
          content='neatf2p, neat f2p, f2p, f2p neat, rsc f2p, f2p rsc, rscf2p, f2prsc, runescapeclassic, runescape classic, rs classic, runescape classic f2p'
        />
        <meta http-equiv='Content-Security-Policy' content='upgrade-insecure-requests'></meta>
      </Head>
      <ThemeProvider theme={theme}>
        <Container isWebClient={isWebclientPage}>
          <AccountWidget user={user} />
          <HomepageLink href='/'>
            <picture>
              <source media='(max-width: 600px)' srcSet='/img/MobileHeaderImage.png' />
              <Logo src={isWebclientPage ? '/img/WebclientHeaderImage.png' : '/img/HeaderImage.png'} alt='Neat F2P' />
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
