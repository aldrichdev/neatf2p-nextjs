import { BodyText } from "@atoms/BodyText"
import { ContentBlock } from "@atoms/ContentBlock"
import { InlineLink } from "@atoms/InlineLink"
import { Typography } from "@mui/material"
import useAuthentication from "@hooks/useAuthentication"

const AccountPage = () => {
  const user = useAuthentication()
  const isLoggedIn = user?.id > 0

  if (!isLoggedIn) {
    return (
      <ContentBlock>
        <Typography variant="h2">Account</Typography>
        <BodyText variant="body">
          You are not currently logged in.
          Please visit the <InlineLink href='/account/login'>Login page</InlineLink> to log in.</BodyText>
      </ContentBlock>
    )
  }

  return (
    <ContentBlock>
      <Typography variant="h2">My Account</Typography>
      <BodyText variant="body">
        The website owner still has to make this page. It&apos;s on the list and should be done soon!
        Please keep checking the <InlineLink href='/news'>News page</InlineLink>, or this one, for updates.
      </BodyText>
    </ContentBlock>
  )
}
export default AccountPage
