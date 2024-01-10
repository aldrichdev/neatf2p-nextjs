import { Typography } from '@mui/material'
import { ContentBlock } from '@atoms/ContentBlock'
import { BodyText } from '@atoms/BodyText'
import { InlineLink } from '@atoms/InlineLink'

type AlreadyLoggedInProps = {
  message?: JSX.Element | string
}

const AlreadyLoggedIn = (props: AlreadyLoggedInProps) => {
  const { message } = props

  return (
    <ContentBlock>
      <Typography variant='h2'>Already Logged In</Typography>
      <BodyText variant='body' textAlign='center'>
        {message || (
          <>
            You are already logged in. You can visit your
            <InlineLink href='/account'>Account page</InlineLink>.
          </>
        )}
      </BodyText>
    </ContentBlock>
  )
}

export default AlreadyLoggedIn
