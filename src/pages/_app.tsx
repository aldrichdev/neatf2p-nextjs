import type { AppProps } from 'next/app'
import Head from 'next/head'
import '@theme/styles.css'
import { MainNavigation } from '@molecules/MainNavigation'
import emailjs from '@emailjs/browser'
import { useEffect } from 'react'
import { Footer } from '@atoms/Footer'
import Link from 'next/link'
import { TooltipProvider } from '@ui/tooltip'
import { ThemeProvider } from 'next-themes'
import Image from 'next/image'
import clsx from 'clsx'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => emailjs.init('NnydzXPqox79rXZ4M'), [])

  return (
    <ThemeProvider attribute='class' defaultTheme='light' enableSystem={false}>
      <Head>
        <title>Page | Neat F2P</title>
        <meta
          name='description'
          content='Neat F2P is a Runescape Classic (RSC) private server that is F2P only (no members) and is 100% free.'
        />
        <meta
          name='keywords'
          content={
            'neatf2p, neat f2p, f2p, f2p neat, rsc f2p, f2p rsc, rscf2p, f2prsc, ' +
            'runescapeclassic, runescape classic, rs classic, runescape classic f2p'
          }
        />
      </Head>
      <TooltipProvider>
        <Link href='/' aria-label='Neat F2P — Home' className='relative block h-50 w-full overflow-hidden lg:h-80'>
          <Image
            src='/img/F2P_areas_2026_crop.png'
            alt=''
            fill
            priority
            quality={90}
            sizes='100vw'
            className={clsx(
              'origin-[50%_5%] scale-200 object-cover object-[50%_25%]',
              'lg:origin-[60%_0%] lg:scale-125 lg:object-[50%_20%]',
            )}
          />
          <div
            className='to-dark-gray absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-transparent'
            aria-hidden='true'
          />
          <div className='absolute inset-0 flex flex-col items-center justify-center' aria-hidden='true'>
            <span
              className={clsx(
                'font-[Cinzel] text-[clamp(3rem,8vw,4.5rem)] text-white',
                'font-semibold drop-shadow-[0_4px_2px_rgba(0,0,0,1)]',
              )}
            >
              Neat
            </span>
            <span className='flex gap-4 text-[clamp(2rem,5vw,3rem)] font-bold drop-shadow-[0_4px_2px_rgba(0,0,0,1)]'>
              <span className='text-fuchsia-500'>F</span>
              <span className='text-yellow-400'>2</span>
              <span className='text-cyan-400'>P</span>
            </span>
          </div>
        </Link>
        <MainNavigation />
        <div className='p-5 pb-10 md:pt-10'>
          <Component {...pageProps} />
        </div>
        <Footer />
      </TooltipProvider>
    </ThemeProvider>
  )
}
