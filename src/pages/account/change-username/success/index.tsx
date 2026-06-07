import { sharedStyles } from '@consts/styles/shared'
import { BodyText } from '@atoms/BodyText'
import { PageHeading } from '@atoms/PageHeading'
import Link from 'next/link'
import { renderHead } from '@utils/renderUtils'

const ChangeUsernameSuccessPage = () => (
  <>
    {renderHead('Success')}
    <div className={sharedStyles.defaultContainer}>
      <PageHeading>Username Updated</PageHeading>
      <BodyText bodyTextAlign='center'>
        Your username has been updated. You can return to your <Link href='/account'>account</Link> page.
      </BodyText>
    </div>
  </>
)

export default ChangeUsernameSuccessPage
