import { useContext } from "react"
import { UserContext } from "@contexts/UserContext"
import { Typography } from "@mui/material"
import { ContentBlock } from "@atoms/ContentBlock"
import { BodyText } from '@atoms/BodyText'
import { InlineLink } from "@atoms/InlineLink"

const CreateAccountSuccessPage = () => {
  const { user } = useContext(UserContext)

  return (
    <ContentBlock>
      <Typography variant="h2">Success</Typography>
      <BodyText variant="body">
        Your account {user?.username} has been created! You can now view your
        <InlineLink href="/account">account page</InlineLink>.
      </BodyText>
    </ContentBlock>
  )
}

export default CreateAccountSuccessPage
