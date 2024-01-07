import { Typography } from '@mui/material'
import { ContentBlock } from '@atoms/ContentBlock'
import { BodyText } from '@atoms/BodyText'
import { InlineLink } from '@atoms/InlineLink'

const ForgotPasswordSuccessPage = () => {
  return (
    <ContentBlock>
      <Typography variant='h2'>Request Received</Typography>
      <BodyText variant='body' textAlign='center'>
        If the email you entered is associated with an account, you will receive an email with a password reset link
        within the next 5-10 minutes. You can now return to the
        <InlineLink href='/'>homepage</InlineLink>.
      </BodyText>
    </ContentBlock>
  )
}

export default ForgotPasswordSuccessPage
