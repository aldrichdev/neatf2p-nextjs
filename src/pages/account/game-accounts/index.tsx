import { BodyText } from '@atoms/BodyText'
import { ContentBlock } from '@atoms/ContentBlock'
import { Typography } from '@mui/material'
import useAuthentication from '@hooks/useAuthentication'
import { UnauthenticatedWarning } from '@molecules/UnauthenticatedWarning'
import { GameAccountsTable } from '@organisms/GameAccountsTable'
import { UserIsLoggedIn } from '@helpers/users/users'
import { FormButton } from '@atoms/FormButton/FormButton'
import { GameAccountsTableMobile } from '@organisms/GameAccountsTableMobile'
import { redirectTo } from '@helpers/window'

const GameAccountsPage = () => {
  const user = useAuthentication()
  const isLoggedIn = UserIsLoggedIn(user)

  if (!isLoggedIn) {
    return <UnauthenticatedWarning />
  }

  const handleCreateAccount = () => {
    redirectTo('/account/game-accounts/create')
  }

  return (
    <ContentBlock isWide>
      <Typography variant='h2'>Game Accounts</Typography>
      <BodyText variant='body'>
        Here, you can view your current game accounts, create new ones, rename them, and update passwords. All times
        shown are in your local timezone.
      </BodyText>
      <GameAccountsTable user={user} />
      <GameAccountsTableMobile user={user} />
      <FormButton variant='contained' onClick={handleCreateAccount}>
        Create Account
      </FormButton>
    </ContentBlock>
  )
}
export default GameAccountsPage
