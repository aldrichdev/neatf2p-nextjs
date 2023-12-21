import { Typography } from '@mui/material'
import { ContentBlock } from '@atoms/ContentBlock'
import { BodyText } from '@atoms/BodyText'
import { InlineLink } from '@atoms/InlineLink'

const AlreadyLoggedIn = () => (
  <ContentBlock>
    <Typography variant='h2'>Login</Typography>
    <BodyText textAlign='center'>
      <Typography variant='body' component='span'>
        You are already logged in. You can visit your
        <InlineLink href='/account'>Account page</InlineLink>.
      </Typography>
    </BodyText>
  </ContentBlock>
)

export default AlreadyLoggedIn
