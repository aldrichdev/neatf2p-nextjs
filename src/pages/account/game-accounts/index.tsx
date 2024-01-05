import { BodyText } from '@atoms/BodyText'
import { ContentBlock } from '@atoms/ContentBlock'
import { Typography } from '@mui/material'
import useAuthentication from '@hooks/useAuthentication'
import { UnauthenticatedWarning } from '@molecules/UnauthenticatedWarning'
import { GameAccountsTable } from '@organisms/GameAccountsTable'
import { UserIsLoggedIn } from '@helpers/users/users'

const GameAccountsPage = () => {
  const user = useAuthentication()
  const isLoggedIn = UserIsLoggedIn(user)

  if (!isLoggedIn) {
    return <UnauthenticatedWarning />
  }

  return (
    <ContentBlock isWide>
      <Typography variant='h2'>Game Accounts</Typography>
      <BodyText variant='body'>
        Here, you can view your current game accounts, create new ones, rename them, and update passwords. All times are
        in your local timezone. TODO: Put Create Account button above the table and implement.
      </BodyText>
      <GameAccountsTable user={user} />
    </ContentBlock>
  )
}
export default GameAccountsPage
