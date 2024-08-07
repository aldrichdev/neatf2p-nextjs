import { BodyText } from '@atoms/BodyText'
import { ContentBlock } from '@atoms/ContentBlock'
import { PageHeading } from '@atoms/PageHeading'
import { MustBeAdminBlockProps } from './MustBeAdminBlock.types'
import { renderHead } from '@helpers/renderUtils'

const MustBeAdminBlock = (props: MustBeAdminBlockProps) => {
  const { textColor } = props

  return (
    <>
      {renderHead('Access Denied')}
      <ContentBlock textColor={textColor}>
        <PageHeading>Nice Try</PageHeading>
        <BodyText variant='body' bodyTextAlign='center'>
          You must be an administrator to perform that action.
        </BodyText>
      </ContentBlock>
    </>
  )
}

export default MustBeAdminBlock
