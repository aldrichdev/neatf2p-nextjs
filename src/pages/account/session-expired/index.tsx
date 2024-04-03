import { ContentBlock } from '@atoms/ContentBlock'
import { BodyText } from '@atoms/BodyText'
import { InlineLink } from '@atoms/InlineLink'
import { PageHeading } from '@atoms/PageHeading'

const SessionExpiredPage = () => (
  <ContentBlock>
    <PageHeading>Session Expired</PageHeading>
    <BodyText variant='body' textAlign='center'>
      Your session has expired. Perhaps you logged in on a different computer or browser? Please{' '}
      <InlineLink href='/account/login'>login</InlineLink> again.
    </BodyText>
  </ContentBlock>
)

export default SessionExpiredPage
