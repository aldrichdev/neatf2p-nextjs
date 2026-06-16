import { sharedStyles } from '@consts/styles/shared'
import { BodyText } from '@atoms/BodyText'
import { PageHeading } from '@atoms/PageHeading'
import Link from 'next/link'
import { renderHead } from '@utils/renderUtils'
import { Callout } from '@atoms/Callout'
import clsx from 'clsx'
import { StandardLink } from '@atoms/StandardLink'

const HowToPlay = () => {
  const clientButtonClass = clsx(
    'flex w-66.5 font-bold justify-center items-center justify-self-center',
    'border-[3px] border-transparent hover:border-[goldenrod] focus:border-[goldenrod]',
    'md:w-51.5 lg:w-66.5',
  )
  const clientImageClass = 'w-66.5 md:w-51.5 lg:w-66.5'
  const clientRemarksClass = 'w-51.5 justify-self-center lg:w-66.5'

  return (
    <>
      {renderHead(
        'How to Play',
        'This page contains important information for how to play Neat F2P. Read it carefully.',
      )}
      <div className={sharedStyles.wideContainer}>
        <PageHeading>How To Play</PageHeading>
        <Callout>
          Please{' '}
          <Link href='/account/create' target='_blank' className='text-callout-warning-text hover:text-amber-950'>
            register
          </Link>{' '}
          on this site and create a{' '}
          <Link
            href='/account/game-accounts'
            target='_blank'
            className='text-callout-warning-text hover:text-amber-950'
          >
            game account
          </Link>{' '}
          before attempting to play. All game accounts must be created via the website - if you attempt to create one in
          the game client, it will <strong>not</strong> work!
        </Callout>
        <BodyText bodyTextAlign='center'>
          There are many ways to play Neat F2P, including RSC+, WebClient, WinRune, and Android.{' '}
          <strong>You need Java</strong> for WinRune and RSC+. If you do not have Java installed or are not sure,{' '}
          <Link href='https://www.java.com/en/download/help/download_options.html' target='_blank'>
            install it
          </Link>{' '}
          before continuing. Press one of the buttons below to continue.
        </BodyText>
        <div className='mt-10'>
          <div className='grid grid-rows-[1fr_0.5fr] items-start gap-7.5 md:grid-cols-2 md:gap-0'>
            <div className='flex flex-wrap items-start justify-center'>
              <Link href='/how-to-play/rscplus' className={clientButtonClass}>
                <img src='/img/buttons/play-with-rscplus.png' alt='Play with RSC+' className={clientImageClass} />
              </Link>
              <p className={clientRemarksClass}>
                <strong>(Recommended)</strong> Newer mechanics, tons of quality of life settings and overlays, requires
                a bit of setup before using, cross-platform
              </p>
            </div>
            <div className='flex flex-wrap items-start justify-center'>
              <Link href='/client/mudclient.html' className={clientButtonClass}>
                <img
                  src='/img/buttons/play-with-webclient.png'
                  alt='Play with Webclient'
                  className={clientImageClass}
                />
              </Link>
              <p className={clientRemarksClass}>
                <strong>New Version!</strong> RSC in your browser. No installation required, cross-platform, uses{' '}
                <StandardLink href='https://github.com/2003scape/rsc-c' hoverUnderline target='_blank'>
                  RSC-C client
                </StandardLink>
                , works well on mobile (e.g. iOS)
              </p>
            </div>
            <div className='flex flex-wrap items-start justify-center'>
              <Link href='/downloads/NeatF2P.exe' className={clientButtonClass}>
                <img src='/img/buttons/play-with-winrune.png' alt='Play with WinRune' className={clientImageClass} />
              </Link>
              <p className={clientRemarksClass}>
                Nostalgic interface, older mechanics, shorter AFK timer, requires Windows
              </p>
            </div>
            <div className='flex flex-wrap items-start justify-center'>
              <Link href='/downloads/neatf2p.apk' className={clientButtonClass}>
                <img
                  src='/img/buttons/play-with-android-client.png'
                  alt='Play with Android Client'
                  className={clientImageClass}
                />
              </Link>
              <p className={clientRemarksClass}>
                <strong>New! </strong>Play Neat F2P on your Android phone or tablet. Similar functionality to the Open
                RSC android app
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HowToPlay
