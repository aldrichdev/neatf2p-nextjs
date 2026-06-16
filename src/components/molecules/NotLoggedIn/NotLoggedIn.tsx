import { BodyText } from '@atoms/BodyText'
import { PageHeading } from '@atoms/PageHeading'
import { sharedStyles } from '../../../consts/styles/shared'
import { StandardLink } from '@atoms/StandardLink'

const NotLoggedIn = () => (
  <div className={sharedStyles.defaultContainer}>
    <PageHeading>Access Denied</PageHeading>
    <BodyText bodyTextAlign='center'>
      You are not currently logged in. Please visit the <StandardLink href='/account/login'>Login page</StandardLink> to
      log in.
    </BodyText>
  </div>
)

export default NotLoggedIn
