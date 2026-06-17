import { BodyText } from '@atoms/BodyText'
import { StandardLink } from '@atoms/StandardLink'
import { PageHeading } from '@atoms/PageHeading'
import { renderHead } from '@utils/renderUtils'
import { sharedStyles } from '@consts/styles/shared'

const ForgotPasswordSuccessPage = () => {
  return (
    <>
      {renderHead('Success')}
      <div className={sharedStyles.defaultContainer}>
        <PageHeading>Request Received</PageHeading>
        <BodyText bodyTextAlign='center'>
          If the email you entered is associated with an account, you will receive an email with a password reset link
          within the next 5-10 minutes. You can now return to the <StandardLink href='/'>homepage</StandardLink>.
        </BodyText>
      </div>
    </>
  )
}

export default ForgotPasswordSuccessPage
