import { BodyText } from '@atoms/BodyText'
import { ContentBlock } from '@atoms/ContentBlock'
import { InlineLink } from '@atoms/InlineLink'
import { Typography } from '@mui/material'

const NotLoggedIn = () => (
  <ContentBlock>
    <Typography variant='h2'>Access Denied</Typography>
    <BodyText variant='body' textAlign='center'>
      You are not currently logged in. Please visit the <InlineLink href='/account/login'>Login page</InlineLink> to log
      in.
    </BodyText>
  </ContentBlock>
)

export default NotLoggedIn
