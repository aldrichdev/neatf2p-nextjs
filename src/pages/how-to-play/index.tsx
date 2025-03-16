import { ContentBlock } from '@atoms/ContentBlock'
import { BodyText } from '@atoms/BodyText'
import { PageHeading } from '@atoms/PageHeading'
import {
  ThreeColumnLayout,
  ClientButton,
  ClientRemarks,
  ClientButtonImage,
  CalloutLink,
} from '@styledPages/HowToPlay.styled'
import Link from 'next/link'
import { renderHead } from '@helpers/renderUtils'
import { Callout } from '@atoms/Callout'
import { InlineLink } from '@atoms/InlineLink'

const HowToPlay = () => {
  return (
    <>
      {renderHead('How to Play')}
      <ContentBlock isWide>
        <PageHeading>How To Play</PageHeading>
        <Callout variant='warning'>
          Please{' '}
          <CalloutLink href='/account/create' target='_blank'>
            register
          </CalloutLink>{' '}
          on this site and create a{' '}
          <CalloutLink href='/account/game-accounts' target='_blank'>
            game account
          </CalloutLink>{' '}
          before attempting to play. All game accounts must be created via the website - if you attempt to create one in
          the game client, it will <strong>not</strong> work!
        </Callout>
        <BodyText variant='body' bodyTextAlign='center'>
          To play Neat F2P, you can use WinRune, RSC+ or the Web client. <strong>You need Java!</strong> If you do not
          have Java installed or are not sure,{' '}
          <Link href='https://www.java.com/en/download/help/download_options.html' target='_blank'>
            install it
          </Link>{' '}
          before continuing. WinRune is a 2003-authentic Windows client for playing the game, and shows original
          adverts. RSC+ is a custom client that provides extra features (all of which are configurable) on top of RSC.
          The web client is a page on this site that lets you play Neat F2P through your browser.
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
              <strong>(Recommended)</strong> Newer mechanics, tons of quality of life settings and overlays, requires a
              bit of setup before using, cross-platform
            </ClientRemarks>
            <ClientRemarks>
              Similar to WinRune but in your browser, requires a privacy warning to be accepted, nostalgic interface
            </ClientRemarks>
          </ThreeColumnLayout>
        </ContentBlock>

        <Callout variant='info'>
          Most players can play on mobile by using Open RSC&apos;s mobile Android app. You can download that from{' '}
          <CalloutLink href='https://rsc.vet/playnow' target='_blank'>
            https://rsc.vet/playnow
          </CalloutLink>
          . Open the client and select <strong>Local Instance</strong> for Game Selection. Then, enter{' '}
          <em>192.3.118.9</em> for the IP and <em>43594</em> for the port.
        </Callout>
      </ContentBlock>
    </>
  )
}

export default HowToPlay
