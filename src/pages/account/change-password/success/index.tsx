import { ContentBlock } from '@atoms/ContentBlock'
import { BodyText } from '@atoms/BodyText'
import { PageHeading } from '@atoms/PageHeading'
import Link from 'next/link'
import Head from 'next/head'

const ChangePasswordSuccessPage = () => (
  <>
    <Head>
      <title>Success | Neat F2P :: Nostalgia Reborn</title>
    </Head>
    <ContentBlock>
      <PageHeading>Password Updated</PageHeading>
      <BodyText variant='body' textAlign='center'>
        Your password has been updated successfully. You may want to log out and in to make sure it is correct. You can
        return to your <Link href='/account'>account</Link> page.
      </BodyText>
    </ContentBlock>
  </>
)

export default ChangePasswordSuccessPage
