import { BodyText } from '@atoms/BodyText'
import { ContentBlock } from '@atoms/ContentBlock'
import { InlineLink } from '@atoms/InlineLink'
import { Typography } from '@mui/material'

const UnauthenticatedWarning = () => (
  <ContentBlock>
    <Typography variant='h2'>Account</Typography>
    <BodyText variant='body'>
      You are not currently logged in. Please visit the <InlineLink href='/account/login'>Login page</InlineLink> to log
      in.
    </BodyText>
  </ContentBlock>
)

export default UnauthenticatedWarning
