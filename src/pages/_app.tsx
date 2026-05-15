import type { AppProps } from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from '@mui/material/styles'
import theme from '@theme/theme'
import '@theme/styles.css'
import { MainNavigation } from '@molecules/MainNavigation'
import { AccountWidget } from '@molecules/AccountWidget'
import useAuthentication from '@hooks/useAuthentication'
import emailjs from '@emailjs/browser'
import { useEffect } from 'react'
import { Footer } from '@atoms/Footer'
import Link from 'next/link'

export default function App({ Component, pageProps }: AppProps) {
  const user = useAuthentication()

  useEffect(() => emailjs.init('NnydzXPqox79rXZ4M'), [])

  return (
    <>
      <Head>
        <title>Page | Neat F2P</title>
        <meta
          name='description'
          content='Neat F2P is a Runescape Classic (RSC) private server that is F2P only (no members) and is 100% free.'
        />
        <meta
          name='keywords'
          content='neatf2p, neat f2p, f2p, f2p neat, rsc f2p, f2p rsc, rscf2p, f2prsc, runescapeclassic, runescape classic, rs classic, runescape classic f2p'
        />
      </Head>
      <ThemeProvider theme={theme}>
        <AccountWidget user={user} />
        <Link href='/' className='my-0 mx-auto block w-full'>
          <picture>
            <source media='(max-width: 600px)' srcSet='/img/MobileHeaderImage.png' />
            <img src='/img/HeaderImage.png' alt='Neat F2P' className='w-full block' />
          </picture>
        </Link>
        <MainNavigation />
        <div className='p-5 pb-10 md:pt-10'>
          <Component {...pageProps} />
        </div>
        <Footer />
      </ThemeProvider>
    </>
  )
}
