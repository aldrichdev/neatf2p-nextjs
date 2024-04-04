import { BodyText } from '@atoms/BodyText'
import { ContentBlock } from '@atoms/ContentBlock'
import { InlineLink } from '@atoms/InlineLink'
import { PageHeading } from '@atoms/PageHeading'
import Head from 'next/head'

const NotLoggedIn = () => (
  <>
    <Head>
      <title>Not Logged In | Neat F2P :: Nostalgia Reborn | Runescape Classic F2P</title>
    </Head>
    <ContentBlock>
      <PageHeading>Access Denied</PageHeading>
      <BodyText variant='body' textAlign='center'>
        You are not currently logged in. Please visit the <InlineLink href='/account/login'>Login page</InlineLink> to
        log in.
      </BodyText>
    </ContentBlock>
  </>
)

export default NotLoggedIn
