import { BodyText } from '@atoms/BodyText'
import { ContentBlock } from '@atoms/ContentBlock'
import { PageHeading } from '@atoms/PageHeading'
import { MustBeAdminBlockProps } from './MustBeAdminBlock.types'

const MustBeAdminBlock = (props: MustBeAdminBlockProps) => {
  const { textColor } = props

  return (
    <ContentBlock textColor={textColor}>
      <PageHeading>Nice Try</PageHeading>
      <BodyText variant='body' textAlign='center'>
        You must be an administrator to perform that action.
      </BodyText>
    </ContentBlock>
  )
}

export default MustBeAdminBlock
