import { ContentBlock } from '@atoms/ContentBlock'
import { BodyText } from '@atoms/BodyText'
import { PageHeading } from '@atoms/PageHeading'
import Link from 'next/link'
import Head from 'next/head'

const ChangeUsernameSuccessPage = () => (
  <>
    <Head>
      <title>Success | Neat F2P :: Nostalgia Reborn</title>
    </Head>
    <ContentBlock>
      <PageHeading>Username Updated</PageHeading>
      <BodyText variant='body' textAlign='center'>
        Your username has been updated. You can return to your <Link href='/account'>account</Link> page.
      </BodyText>
    </ContentBlock>
  </>
)

export default ChangeUsernameSuccessPage
