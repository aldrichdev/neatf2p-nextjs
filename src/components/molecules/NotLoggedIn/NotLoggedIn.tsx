import { BodyText } from '@atoms/BodyText'
import { ContentBlock } from '@atoms/ContentBlock'
import { InlineLink } from '@atoms/InlineLink'
import { PageHeading } from '@atoms/PageHeading'
import { renderHead } from '@helpers/renderUtils'

const NotLoggedIn = () => (
  <>
    {renderHead('Not Logged In')}
    <ContentBlock>
      <PageHeading>Access Denied</PageHeading>
      <BodyText variant='body' bodyTextAlign='center'>
        You are not currently logged in. Please visit the <InlineLink href='/account/login'>Login page</InlineLink> to
        log in.
      </BodyText>
    </ContentBlock>
  </>
)

export default NotLoggedIn
