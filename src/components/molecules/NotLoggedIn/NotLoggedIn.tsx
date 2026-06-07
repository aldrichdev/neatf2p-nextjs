import { BodyText } from '@atoms/BodyText'
import { InlineLink } from '@atoms/InlineLink'
import { PageHeading } from '@atoms/PageHeading'
import { sharedStyles } from '../../../consts/styles/shared'

const NotLoggedIn = () => (
  <div className={sharedStyles.defaultContainer}>
    <PageHeading>Access Denied</PageHeading>
    <BodyText bodyTextAlign='center'>
      You are not currently logged in. Please visit the <InlineLink href='/account/login'>Login page</InlineLink> to log
      in.
    </BodyText>
  </div>
)

export default NotLoggedIn
