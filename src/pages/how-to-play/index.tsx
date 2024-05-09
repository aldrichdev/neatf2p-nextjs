import { ContentBlock } from '@atoms/ContentBlock'
import { BodyText } from '@atoms/BodyText'
import { PageHeading } from '@atoms/PageHeading'
import { ThreeColumnLayout, ClientButton, ClientRemarks, ClientButtonImage } from '@styledPages/HowToPlay.styled'
import Link from 'next/link'
import Head from 'next/head'

const HowToPlay = () => {
  return (
    <>
      <Head>
        <title>How to Play | Neat F2P :: Nostalgia Reborn | Runescape Classic F2P</title>
      </Head>
      <ContentBlock isWide>
        <PageHeading>How To Play</PageHeading>
        <BodyText variant='body' bodyTextAlign='center'>
          To play Neat F2P, you can use WinRune, RSC+ or the Web client. <strong>You need Java!</strong> If you do not
          have Java installed or are not sure,{' '}
          <Link href='https://www.java.com/en/download/help/download_options.html' target='_blank'>
            install it
          </Link>{' '}
          before continuing. WinRune is a 2003-authentic Windows client for playing the game, and shows original
          adverts. RSC+ is a custom client that provides extra features on top of RSC. The web client is a page on this
          site that lets you play Neat F2P through your browser.
        </BodyText>
        <BodyText variant='body' bodyTextAlign='center'>
          Don&apos;t have an account yet? Head over to the <Link href='/account/game-accounts'>game accounts</Link> page
          to create one.
        </BodyText>
        <ContentBlock topMargin={40} isWide>
          <ThreeColumnLayout>
            <ClientButton href='/downloads/NeatF2P.exe'>
              <ClientButtonImage src='/img/buttons/play-with-winrune.png' alt='Play with WinRune' />
            </ClientButton>
            <ClientButton href='/how-to-play/rscplus'>
              <ClientButtonImage src='/img/buttons/play-with-rscplus.png' alt='Play with RSC+' />
            </ClientButton>
            <ClientButton href='/webclient'>
              <ClientButtonImage src='/img/buttons/play-with-webclient.png' alt='Play wikth Webclient' />
            </ClientButton>
            <ClientRemarks>
              Fastest way to get in game, older mechanics, shorter AFK timer, requires Windows, nostalgic interface
            </ClientRemarks>
            <ClientRemarks>
              Newer mechanics, tons of quality of life settings and overlays, requires a bit of setup before using,
              cross-platform
            </ClientRemarks>
            <ClientRemarks>
              Similar to WinRune but in your browser, requires a privacy warning to be accepted, nostalgic interface
            </ClientRemarks>
          </ThreeColumnLayout>
        </ContentBlock>
      </ContentBlock>
    </>
  )
}

export default HowToPlay
