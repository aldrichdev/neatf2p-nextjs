import { BodyText } from '@atoms/BodyText'
import { ContentBlock } from '@atoms/ContentBlock'
import { Typography } from '@mui/material'

const MustBeAdminBlock = () => (
  <ContentBlock>
    <Typography variant='h2'>Nice Try</Typography>
    <BodyText variant='body' textAlign='center'>
      You must be an administrator to perform that action.
    </BodyText>
  </ContentBlock>
)

export default MustBeAdminBlock
