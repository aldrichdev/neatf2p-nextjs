import { sharedStyles } from '@consts/styles/shared'
import { BodyText } from '@atoms/BodyText'
import { InlineLink } from '@atoms/InlineLink'
import { PageHeading } from '@atoms/PageHeading'
import { renderHead } from '@utils/renderUtils'

const SessionExpiredPage = () => (
  <>
    {renderHead('Session Expired')}
    <div className={sharedStyles.defaultContainer}>
      <PageHeading>Session Expired</PageHeading>
      <BodyText bodyTextAlign='center'>
        Your session has expired. Perhaps you logged in on a different computer or browser?
      </BodyText>
      <BodyText bodyTextAlign='center'>
        Please<InlineLink href='/account/login'>login</InlineLink> again.
      </BodyText>
    </div>
  </>
)

export default SessionExpiredPage
