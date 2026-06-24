import { sharedStyles } from '@consts/styles/shared'
import { BodyText } from '@atoms/BodyText'
import { PageHeading } from '@atoms/PageHeading'
import { renderHead } from '@utils/renderUtils'
import { StandardLink } from '@atoms/StandardLink'

const ChangeUsernameSuccessPage = () => (
  <>
    {renderHead('Success')}
    <div className={sharedStyles.defaultContainer}>
      <PageHeading>Website Username Updated</PageHeading>
      <BodyText bodyTextAlign='center'>
        Your website username has been updated. You can return to your{' '}
        <StandardLink href='/account'>account</StandardLink> page.
      </BodyText>
    </div>
  </>
)

export default ChangeUsernameSuccessPage
