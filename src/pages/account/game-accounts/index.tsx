import { BodyText } from '@atoms/BodyText'
import { ContentBlock } from '@atoms/ContentBlock'
import { GameAccountsTable } from '@organisms/GameAccountsTable'
import { UserIsLoggedIn } from '@helpers/users/users'
import { FormButton } from '@atoms/FormButton/FormButton'
import { GameAccountsTableMobile } from '@organisms/GameAccountsTableMobile'
import { redirectTo } from '@helpers/window'
import { NotLoggedIn } from '@molecules/NotLoggedIn'
import { useState } from 'react'
import { PlayerDataRow } from '@globalTypes/Database/PlayerDataRow'
import { PageHeading } from '@atoms/PageHeading'
import { renderHead } from '@helpers/renderUtils'
import { User } from '@globalTypes/User'
import { NullUser } from '@models/NullUser'
import { sessionOptions } from '@models/session'
import { getIronSession } from 'iron-session'
import { GetServerSideProps } from 'next'

type GameAccountsPageProps = {
  user: User
}

const GameAccountsPage = ({ user }: GameAccountsPageProps) => {
  const [activeAccount, setActiveAccount] = useState<PlayerDataRow>()
  const [renameModalVisible, setRenameModalVisible] = useState(false)
  const [passwordModalVisible, setPasswordModalVisible] = useState(false)
  const [characterInfoModalVisible, setCharacterInfoModalVisible] = useState(false)
  const isLoggedIn = UserIsLoggedIn(user)
  const creationsDisabled = process.env.NEXT_PUBLIC_GAME_ACCOUNTS_DISABLE_CREATION === 'true'

  const showRenameModal = (account: PlayerDataRow) => {
    setRenameModalVisible(true)
    setActiveAccount(account)
  }

  const showPasswordModal = (account: PlayerDataRow) => {
    setPasswordModalVisible(true)
    setActiveAccount(account)
  }

  const showCharacterInfoModal = (account: PlayerDataRow) => {
    setCharacterInfoModalVisible(true)
    setActiveAccount(account)
  }

  const handleCreateAccount = () => {
    redirectTo('/account/game-accounts/create')
  }

  return (
    <>
      {renderHead(
        'Game Accounts',
        'View your current game accounts, create new ones, rename them, and update passwords.',
      )}
      {!isLoggedIn ? (
        <NotLoggedIn />
      ) : (
        <ContentBlock isWide>
          <PageHeading>Game Accounts</PageHeading>
          <BodyText variant='body' bodyTextAlign='center'>
            Here, you can view your current game accounts, create new ones, rename them, and update passwords. All times
            shown are in your local timezone.
          </BodyText>
          <GameAccountsTable
            user={user}
            activeAccount={activeAccount}
            renameModalVisible={renameModalVisible}
            passwordModalVisible={passwordModalVisible}
            characterInfoModalVisible={characterInfoModalVisible}
            setRenameModalVisible={setRenameModalVisible}
            setPasswordModalVisible={setPasswordModalVisible}
            setCharacterInfoModalVisible={setCharacterInfoModalVisible}
            showRenameModal={showRenameModal}
            showPasswordModal={showPasswordModal}
            showCharacterInfoModal={showCharacterInfoModal}
          />
          <GameAccountsTableMobile
            user={user}
            activeAccount={activeAccount}
            renameModalVisible={renameModalVisible}
            passwordModalVisible={passwordModalVisible}
            characterInfoModalVisible={characterInfoModalVisible}
            setRenameModalVisible={setRenameModalVisible}
            setPasswordModalVisible={setPasswordModalVisible}
            setCharacterInfoModalVisible={setCharacterInfoModalVisible}
            showRenameModal={showRenameModal}
            showPasswordModal={showPasswordModal}
            showCharacterInfoModal={showCharacterInfoModal}
          />
          {creationsDisabled && (
            <BodyText variant='body' bodyTextAlign='center'>
              Game account creations are temporarily disabled until further notice.
            </BodyText>
          )}
          <FormButton variant='contained' onClick={handleCreateAccount} disabled={creationsDisabled}>
            Create Account
          </FormButton>
        </ContentBlock>
      )}
    </>
  )
}
export default GameAccountsPage

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getIronSession(req, res, sessionOptions)
  const user: User = session?.user || NullUser

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  }
}
