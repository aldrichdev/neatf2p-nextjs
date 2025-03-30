import { TabletAndDesktopBanner } from '@atoms/TabletAndDesktopBanner/TabletAndDesktopBanner'
import { BodyText } from '@atoms/BodyText'
import { ContentBlock } from '@atoms/ContentBlock'
import { InlineLink } from '@atoms/InlineLink'
import { PageHeading } from '@atoms/PageHeading'
import { renderHead } from '@helpers/renderUtils'
import { Button } from '@mui/material'
import { MobileOnlyBanner } from '@atoms/MobileOnlyBanner/MobileOnlyBanner'

const WebclientPrivacy = () => {
  const gameServerHost = process.env.NEXT_PUBLIC_GAME_SERVER_HOST
  const gameServerRsaKey = process.env.NEXT_PUBLIC_GAME_SERVER_RSA_PUBLIC_KEY
  const webclientUrl = `https://${gameServerHost}/index.html#free,${gameServerHost},43494,65537,${gameServerRsaKey},true`

  return (
    <>
      {renderHead('Webclient Privacy')}
      <ContentBlock isWide>
        <PageHeading>Before You Continue...</PageHeading>
        <BodyText variant='body' bodyTextAlign='center'>
          In order to play on the Neat F2P Web Client, you must accept a privacy warning. Navigate to
          <InlineLink href={webclientUrl} target='_blank'>
            this page
          </InlineLink>{' '}
          and you may see a privacy warning. If so, click <strong>Advanced</strong> and then{' '}
          <strong>Continue to {gameServerHost} (unsafe)</strong>. This should load the webclient, but not on the Neat
          F2P site. Finally, close the tab. See the below image for a step-by-step walkthrough.
        </BodyText>
        <ContentBlock isWide topMargin={40}>
          <TabletAndDesktopBanner src='/img/banners/webclient-privacy-instructions.png' alt='Webclient Setup Graphic' />
          <MobileOnlyBanner
            src='/img/banners/mobile-webclient-privacy-instructions.png'
            alt='Webclient Setup Graphic'
          />
        </ContentBlock>
        <BodyText variant='body' bodyTextAlign='center'>
          Once you have done this, you can now launch the webclient on the Neat F2P site.
        </BodyText>
        <ContentBlock isWide topMargin={20}>
          <Button variant='contained' href='/webclient'>
            Launch Web Client
          </Button>
        </ContentBlock>
      </ContentBlock>
    </>
  )
}

export default WebclientPrivacy
