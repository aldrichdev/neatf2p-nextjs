import { sharedStyles } from '@consts/styles/shared'
import { BodyText } from '@atoms/BodyText'
import { PageHeading } from '@atoms/PageHeading'
import { renderHead } from '@utils/renderUtils'
import { StandardLink } from '@atoms/StandardLink'

const SessionExpiredPage = () => (
  <>
    {renderHead('Session Expired')}
    <div className={sharedStyles.defaultContainer}>
      <PageHeading>Session Expired</PageHeading>
      <BodyText bodyTextAlign='center'>
        Your session has expired. Perhaps you logged in on a different computer or browser?
      </BodyText>
      <BodyText bodyTextAlign='center'>
        Please<StandardLink href='/account/login'>login</StandardLink> again.
      </BodyText>
    </div>
  </>
)

export default SessionExpiredPage
