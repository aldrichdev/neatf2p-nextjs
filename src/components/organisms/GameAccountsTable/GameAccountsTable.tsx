import { Spinner } from '@molecules/Spinner'
import { useEffect, useState } from 'react'
import { GameAccountRow } from '@molecules/GameAccountRow'
import { GameAccountsTableProps } from './GameAccountsTable.types'
import { RenameAccountModal } from '@organisms/RenameAccountModal'
import { PasswordModal } from '@organisms/PasswordModal'
import { GameAccountsTableCell } from '@atoms/GameAccountsTableCell'
import useGameAccounts from '@hooks/useGameAccounts'
import { CharacterInfoModal } from '@organisms/CharacterInfoModal'
import { BodyText } from '@atoms/BodyText'

const GameAccountsTable = (props: GameAccountsTableProps) => {
  const {
    user,
    activeAccount,
    renameModalVisible,
    passwordModalVisible,
    characterInfoModalVisible,
    setRenameModalVisible,
    setPasswordModalVisible,
    setCharacterInfoModalVisible,
    showRenameModal,
    showPasswordModal,
    showCharacterInfoModal,
  } = props
  const [isLoading, setIsLoading] = useState(true)
  const accounts = useGameAccounts(user?.id)

  useEffect(() => {
    if (accounts) setIsLoading(false)
  }, [accounts])

  if (isLoading) {
    return (
      <div className='hidden md:mt-5 md:block'>
        <Spinner />
      </div>
    )
  } else if (process.env.NEXT_PUBLIC_GAME_ACCOUNTS_DISABLE_CREATION === 'true') {
    return null
  } else if (accounts && accounts.length < 1) {
    return (
      <BodyText bodyTextAlign='center' className='mt-0 hidden md:block'>
        You don&apos;t have any accounts right now. Why not create one?
      </BodyText>
    )
  }

  return (
    <div className='mt-10 hidden overflow-hidden rounded shadow md:block'>
      <table className='w-full' aria-label='Game Accounts Table'>
        <thead>
          <tr>
            <GameAccountsTableCell bold>Id</GameAccountsTableCell>
            <GameAccountsTableCell bold>Account Name</GameAccountsTableCell>
            <GameAccountsTableCell bold>Combat Level</GameAccountsTableCell>
            <GameAccountsTableCell bold>Last Login</GameAccountsTableCell>
            <GameAccountsTableCell bold>Rename?</GameAccountsTableCell>
            <GameAccountsTableCell bold>Password</GameAccountsTableCell>
            <GameAccountsTableCell bold>Info</GameAccountsTableCell>
          </tr>
        </thead>
        <tbody>
          {accounts?.map(account => (
            <GameAccountRow
              key={account.id}
              account={account}
              showRenameModal={showRenameModal}
              showPasswordModal={showPasswordModal}
              showCharacterInfoModal={showCharacterInfoModal}
            />
          ))}
        </tbody>
      </table>
      {renameModalVisible && activeAccount && (
        <RenameAccountModal
          account={activeAccount}
          open={renameModalVisible}
          setOpen={setRenameModalVisible}
          user={user}
        />
      )}
      {passwordModalVisible && activeAccount && (
        <PasswordModal
          account={activeAccount}
          open={passwordModalVisible}
          setOpen={setPasswordModalVisible}
          user={user}
        />
      )}
      {characterInfoModalVisible && activeAccount && (
        <CharacterInfoModal
          account={activeAccount}
          open={characterInfoModalVisible}
          setOpen={setCharacterInfoModalVisible}
        />
      )}
    </div>
  )
}

export default GameAccountsTable
