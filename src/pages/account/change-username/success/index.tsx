import { ContentBlock } from '@atoms/ContentBlock'
import { BodyText } from '@atoms/BodyText'
import { PageHeading } from '@atoms/PageHeading'
import Link from 'next/link'
import { renderHead } from '@helpers/renderUtils'

const ChangeUsernameSuccessPage = () => (
  <>
    {renderHead('Success')}
    <ContentBlock>
      <PageHeading>Username Updated</PageHeading>
      <BodyText variant='body' bodyTextAlign='center'>
        Your username has been updated. You can return to your <Link href='/account'>account</Link> page.
      </BodyText>
    </ContentBlock>
  </>
)

export default ChangeUsernameSuccessPage
