import { BodyText } from '@atoms/BodyText'
import { ContentBlock } from '@atoms/ContentBlock'
import { InlineLink } from '@atoms/InlineLink'
import { Typography } from '@mui/material'

const NotLoggedIn = () => (
  <ContentBlock>
    <Typography variant='h2'>Access Denied</Typography>
    <BodyText variant='body' textAlign='center'>
      You are not logged in. This action is only available to users that are logged in. You can visit the{' '}
      <InlineLink href='/account/login'>Login page</InlineLink>.
    </BodyText>
  </ContentBlock>
)

export default NotLoggedIn
