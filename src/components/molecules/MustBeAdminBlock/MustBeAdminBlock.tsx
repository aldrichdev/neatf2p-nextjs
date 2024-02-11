import { BodyText } from '@atoms/BodyText'
import { ContentBlock } from '@atoms/ContentBlock'
import { PageHeading } from '@atoms/PageHeading'

const MustBeAdminBlock = () => (
  <ContentBlock>
    <PageHeading>Nice Try</PageHeading>
    <BodyText variant='body' textAlign='center'>
      You must be an administrator to perform that action.
    </BodyText>
  </ContentBlock>
)

export default MustBeAdminBlock
