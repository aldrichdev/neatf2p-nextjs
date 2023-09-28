import { Typography } from "@mui/material"
import { ContentBlock } from "@atoms/ContentBlock"
import { BodyText } from '@atoms/BodyText'
import { InlineLink } from "@atoms/InlineLink"
import useAuthentication from "@hooks/useAuthentication"

const CreateAccountSuccessPage = () => {
  const user = useAuthentication()

  if (user?.id < 1) {
    // Something went wrong...
    return (
      <ContentBlock>
        <Typography variant="h2">Oops...</Typography>
        <BodyText variant="body" textAlign="center">
          Something went wrong... you are now {user?.username}!
          Tell all your friends, then try logging in again, or notify the admin
        </BodyText>
      </ContentBlock>
    )
  }

  return (
    <ContentBlock>
      <Typography variant="h2">Success</Typography>
      <BodyText variant="body" textAlign="center">
        Your account, {user?.username}, has been created! You can now view your
        <InlineLink href="/account">Account page</InlineLink>.
      </BodyText>
    </ContentBlock>
  )
}

export default CreateAccountSuccessPage
