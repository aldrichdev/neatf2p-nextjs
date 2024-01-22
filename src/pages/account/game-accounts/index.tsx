import { BodyText } from '@atoms/BodyText'
import { ContentBlock } from '@atoms/ContentBlock'
import { Typography } from '@mui/material'
import useAuthentication from '@hooks/useAuthentication'
import { GameAccountsTable } from '@organisms/GameAccountsTable'
import { UserIsLoggedIn } from '@helpers/users/users'
import { FormButton } from '@atoms/FormButton/FormButton'
import { GameAccountsTableMobile } from '@organisms/GameAccountsTableMobile'
import { redirectTo } from '@helpers/window'
import { NotLoggedIn } from '@molecules/NotLoggedIn'
import { useState } from 'react'
import { Spinner } from '@molecules/Spinner'
import { PlayerDataRow } from '@globalTypes/Database/PlayerDataRow'

const GameAccountsPage = () => {
  const [loading, setLoading] = useState(true)
  const [activeAccount, setActiveAccount] = useState<PlayerDataRow>()
  const [renameModalVisible, setRenameModalVisible] = useState(false)
  const [passwordModalVisible, setPasswordModalVisible] = useState(false)
  const user = useAuthentication(setLoading)
  const isLoggedIn = UserIsLoggedIn(user)

  if (loading) {
    return <Spinner />
  }

  if (!isLoggedIn) {
    return <NotLoggedIn />
  }

  const showRenameModal = (visible: boolean, account: PlayerDataRow) => {
    setRenameModalVisible(true)
    setActiveAccount(account)
  }

  const showPasswordModal = (visible: boolean, account: PlayerDataRow) => {
    setPasswordModalVisible(true)
    setActiveAccount(account)
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
      <GameAccountsTable
        user={user}
        activeAccount={activeAccount}
        renameModalVisible={renameModalVisible}
        passwordModalVisible={passwordModalVisible}
        setRenameModalVisible={setRenameModalVisible}
        setPasswordModalVisible={setPasswordModalVisible}
        showRenameModal={showRenameModal}
        showPasswordModal={showPasswordModal}
      />
      <GameAccountsTableMobile
        user={user}
        activeAccount={activeAccount}
        renameModalVisible={renameModalVisible}
        passwordModalVisible={passwordModalVisible}
        setRenameModalVisible={setRenameModalVisible}
        setPasswordModalVisible={setPasswordModalVisible}
        showRenameModal={showRenameModal}
        showPasswordModal={showPasswordModal}
      />
      <FormButton variant='contained' onClick={handleCreateAccount}>
        Create Account
      </FormButton>
    </ContentBlock>
  )
}
export default GameAccountsPage
