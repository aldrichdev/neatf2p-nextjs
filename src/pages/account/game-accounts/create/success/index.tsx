import { Typography } from '@mui/material'
import { ContentBlock } from '@atoms/ContentBlock'
import { BodyText } from '@atoms/BodyText'
import { InlineLink } from '@atoms/InlineLink'
import { useRouter } from 'next/router'
import useAuthentication from '@hooks/useAuthentication'
import { UserIsLoggedIn } from '@helpers/users/users'
import { NotLoggedIn } from '@molecules/NotLoggedIn'

const CreateAccountSuccessPage = () => {
  const { query } = useRouter()
  const user = useAuthentication()
  const accountName = query['accountName']

  if (!UserIsLoggedIn(user)) {
    return <NotLoggedIn />
  }

  if (accountName?.length && accountName?.length < 1) {
    // Something went wrong...
    return (
      <ContentBlock>
        <Typography variant='h2'>Oops...</Typography>
        <BodyText variant='body' textAlign='center'>
          Something went wrong... your game account name is {accountName}. Please report this to the admin.
        </BodyText>
      </ContentBlock>
    )
  }

  return (
    <ContentBlock>
      <Typography variant='h2'>Success</Typography>
      <BodyText variant='body' textAlign='center'>
        Your game account, <strong>{accountName}</strong>, has been created. You can now log in.
      </BodyText>
      <BodyText variant='body' textAlign='center'>
        You may return to the
        <InlineLink href='/account/game-accounts'>game accounts page</InlineLink>.
      </BodyText>
    </ContentBlock>
  )
}

export default CreateAccountSuccessPage