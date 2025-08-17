import { ContentBlock } from '@atoms/ContentBlock'
import { BodyText } from '@atoms/BodyText'
import { InlineLink } from '@atoms/InlineLink'
import { PageHeading } from '@atoms/PageHeading'

type AlreadyLoggedInProps = {
  message?: JSX.Element | string
}

const AlreadyLoggedIn = (props: AlreadyLoggedInProps) => {
  const { message } = props

  return (
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
  )
}

export default AlreadyLoggedIn
