import { BodyText } from '@atoms/BodyText'
import { ContentBlock } from '@atoms/ContentBlock'
import { Typography } from '@mui/material'
import useAuthentication from '@hooks/useAuthentication'
import { UnauthenticatedWarning } from '@molecules/UnauthenticatedWarning'
import { GameAccountsTable } from '@atoms/GameAccountsTable'

const GameAccountsPage = () => {
  const user = useAuthentication()
  const isLoggedIn = user?.id > 0

  if (!isLoggedIn) {
    return <UnauthenticatedWarning />
  }

  return (
    <ContentBlock>
      <Typography variant='h2'>Game Accounts</Typography>
      <BodyText variant='body'>
        Here, you can view your current game accounts, create new ones, rename them, and update passwords. Idea is to
        put an MUI table here with account name, created date, rename button, and update password button. And above
        that, a Create Account button, of course.
      </BodyText>
      <GameAccountsTable user={user} />
    </ContentBlock>
  )
}
export default GameAccountsPage
