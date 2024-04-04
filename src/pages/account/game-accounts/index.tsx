import { BodyText } from '@atoms/BodyText'
import { ContentBlock } from '@atoms/ContentBlock'
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
import { PageHeading } from '@atoms/PageHeading'
import Head from 'next/head'

const GameAccountsPage = () => {
  const [loading, setLoading] = useState(true)
  const [activeAccount, setActiveAccount] = useState<PlayerDataRow>()
  const [renameModalVisible, setRenameModalVisible] = useState(false)
  const [passwordModalVisible, setPasswordModalVisible] = useState(false)
  const user = useAuthentication(setLoading)
  const isLoggedIn = UserIsLoggedIn(user)
  const creationsDisabled = process.env.NEXT_PUBLIC_GAME_ACCOUNTS_DISABLE_CREATION === 'true'

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
    <>
      <Head>
        <title>Game Accounts | Neat F2P :: Nostalgia Reborn</title>
      </Head>
      <ContentBlock isWide>
        <PageHeading>Game Accounts</PageHeading>
        <BodyText variant='body' textAlign='center'>
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
        {creationsDisabled && (
          <BodyText variant='body' textAlign='center'>
            Game account creations are temporarily disabled until further notice.
          </BodyText>
        )}
        <FormButton variant='contained' onClick={handleCreateAccount} disabled={creationsDisabled}>
          Create Account
        </FormButton>
      </ContentBlock>
    </>
  )
}
export default GameAccountsPage
