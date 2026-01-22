import { ContentBlock } from '@atoms/ContentBlock'
import { BodyText } from '@atoms/BodyText'
import { PageHeading } from '@atoms/PageHeading'
import {
  PlayOptionsGrid,
  ClientButton,
  ClientRemarks,
  ClientButtonImage,
  CalloutLink,
} from '@styledPages/HowToPlay.styled'
import Link from 'next/link'
import { renderHead } from '@helpers/renderUtils'
import { Callout } from '@atoms/Callout'

const HowToPlay = () => (
  <>
    {renderHead('How to Play', 'This page contains important information for how to play Neat F2P. Read it carefully.')}
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
        There are many ways to play Neat F2P, including WinRune, RSC+, the Web client, or Android.{' '}
        <strong>You need Java</strong> for all platforms except Android. If you do not have Java installed or are not
        sure,{' '}
        <Link href='https://www.java.com/en/download/help/download_options.html' target='_blank'>
          install it
        </Link>{' '}
        before continuing. Press one of the buttons below to continue.
      </BodyText>
      <ContentBlock topMargin={40}>
        <PlayOptionsGrid>
          <div>
            <ClientButton href='/downloads/NeatF2P.exe'>
              <ClientButtonImage src='/img/buttons/play-with-winrune.png' alt='Play with WinRune' />
            </ClientButton>
            <ClientRemarks>
              Fastest way to get in game, older mechanics, shorter AFK timer, requires Windows, nostalgic interface
            </ClientRemarks>
          </div>
          <div>
            <ClientButton href='/how-to-play/rscplus'>
              <ClientButtonImage src='/img/buttons/play-with-rscplus.png' alt='Play with RSC+' />
            </ClientButton>
            <ClientRemarks>
              <strong>(Recommended)</strong> Newer mechanics, tons of quality of life settings and overlays, requires a
              bit of setup before using, cross-platform
            </ClientRemarks>
          </div>
          <div>
            <ClientButton href='/webclient-privacy'>
              <ClientButtonImage src='/img/buttons/play-with-webclient.png' alt='Play with Webclient' />
            </ClientButton>
            <ClientRemarks>
              Similar to WinRune but in your browser, requires a privacy warning to be accepted, nostalgic interface
            </ClientRemarks>
          </div>
          <div>
            <ClientButton href='/downloads/neatf2p.apk'>
              <ClientButtonImage src='/img/buttons/play-with-android-client.png' alt='Play with Android Client' />
            </ClientButton>
            <ClientRemarks>
              <strong>New! </strong>Play Neat F2P on your Android phone or tablet. Similar functionality to the Open RSC
              android app
            </ClientRemarks>
          </div>
        </PlayOptionsGrid>
      </ContentBlock>
    </ContentBlock>
  </>
)

export default HowToPlay
