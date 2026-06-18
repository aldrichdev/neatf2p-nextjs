import { BodyText } from '@atoms/BodyText'
import { PageHeading } from '@atoms/PageHeading'
import { renderHead } from '@utils/renderUtils'
import { sharedStyles } from '@consts/styles/shared'
import { StandardLink } from '@atoms/StandardLink'

const ChangePasswordSuccessPage = () => (
  <>
    {renderHead('Success')}
    <div className={sharedStyles.defaultContainer}>
      <PageHeading>Website Password Updated</PageHeading>
      <BodyText bodyTextAlign='center'>
        Your website account password has been updated successfully. You may want to log out and in to make sure it is
        correct. You can return to your <StandardLink href='/account'>account</StandardLink> page.
      </BodyText>
    </div>
  </>
)

export default ChangePasswordSuccessPage
