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
import usePagination from '@hooks/usePagination'
import { PaginationBar } from '@atoms/PaginationBar'

/** A table showing all game accounts the user has created. */
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
  const { startingRecord, endingRecord, page, setPage, pageCount } = usePagination(accounts?.length || 0)

  useEffect(() => {
    if (accounts) setIsLoading(false)
  }, [accounts])

  if (isLoading) {
    return (
      <div className='w-full'>
        <Spinner />
      </div>
    )
  } else if (process.env.NEXT_PUBLIC_GAME_ACCOUNTS_DISABLE_CREATION === 'true') {
    return null
  } else if (accounts && accounts.length < 1) {
    return <BodyText bodyTextAlign='center'>You don&apos;t have any accounts right now. Why not create one?</BodyText>
  }

  return (
    <div className='overflow-hidden rounded'>
      <table className='w-full table-fixed lg:table-auto' aria-label='Game Accounts Table'>
        <thead>
          <tr>
            <GameAccountsTableCell bold className='w-12 lg:hidden lg:w-auto' />
            <GameAccountsTableCell bold className='hidden lg:table-cell'>
              Id
            </GameAccountsTableCell>
            <GameAccountsTableCell bold>Account Name</GameAccountsTableCell>
            <GameAccountsTableCell bold>Combat Level</GameAccountsTableCell>
            <GameAccountsTableCell bold className='hidden lg:table-cell'>
              Last Login
            </GameAccountsTableCell>
            <GameAccountsTableCell bold className='hidden lg:table-cell'>
              Actions
            </GameAccountsTableCell>
          </tr>
        </thead>
        <tbody>
          {accounts?.slice(startingRecord, endingRecord).map(account => (
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
      {pageCount > 1 && <PaginationBar page={page} pageCount={pageCount} handlePageChange={setPage} />}
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
