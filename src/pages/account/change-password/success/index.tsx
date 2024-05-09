import { ContentBlock } from '@atoms/ContentBlock'
import { BodyText } from '@atoms/BodyText'
import { PageHeading } from '@atoms/PageHeading'
import Link from 'next/link'
import { renderHead } from '@helpers/renderUtils'

const ChangePasswordSuccessPage = () => (
  <>
    {renderHead('Success')}
    <ContentBlock>
      <PageHeading>Password Updated</PageHeading>
      <BodyText variant='body' bodyTextAlign='center'>
        Your password has been updated successfully. You may want to log out and in to make sure it is correct. You can
        return to your <Link href='/account'>account</Link> page.
      </BodyText>
    </ContentBlock>
  </>
)

export default ChangePasswordSuccessPage
