import { BodyText } from '@atoms/BodyText'
import { PageHeading } from '@atoms/PageHeading'
import Link from 'next/link'
import { renderHead } from '@utils/renderUtils'
import { sharedStyles } from '@consts/styles/shared'

const ChangePasswordSuccessPage = () => (
  <>
    {renderHead('Success')}
    <div className={sharedStyles.defaultContainer}>
      <PageHeading>Password Updated</PageHeading>
      <BodyText bodyTextAlign='center'>
        Your password has been updated successfully. You may want to log out and in to make sure it is correct. You can
        return to your <Link href='/account'>account</Link> page.
      </BodyText>
    </div>
  </>
)

export default ChangePasswordSuccessPage
