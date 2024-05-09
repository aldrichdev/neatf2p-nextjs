import { ContentBlock } from '@atoms/ContentBlock'
import { BodyText } from '@atoms/BodyText'
import { InlineLink } from '@atoms/InlineLink'
import { PageHeading } from '@atoms/PageHeading'
import Head from 'next/head'

type AlreadyLoggedInProps = {
  message?: JSX.Element | string
}

const AlreadyLoggedIn = (props: AlreadyLoggedInProps) => {
  const { message } = props

  return (
    <>
      <Head>
        <title>Already Logged In | Neat F2P :: Nostalgia Reborn | Runescape Classic F2P</title>
      </Head>
      <ContentBlock>
        <PageHeading>Already Logged In</PageHeading>
        <BodyText variant='body' bodyTextAlign='center'>
          {message || (
            <>
              You are already logged in. You can visit your
              <InlineLink href='/account'>Account page</InlineLink>.
            </>
          )}
        </BodyText>
      </ContentBlock>
    </>
  )
}

export default AlreadyLoggedIn
