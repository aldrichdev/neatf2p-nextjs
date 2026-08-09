import { PlayerDataRow } from '@globalTypes/Database/PlayerDataRow'
import { Spinner } from '@molecules/Spinner'
import { useEffect, useState } from 'react'
import { GameAccountsTableProps } from '@organisms/GameAccountsTable/GameAccountsTable.types'
import { RenameAccountModal } from '@organisms/RenameAccountModal'
import { PasswordModal } from '@organisms/PasswordModal'
import { GameAccountRowMobile } from '@molecules/GameAccountRowMobile'
import { getPrettyDateStringFromMillis } from '@utils/date/date'
import useGameAccounts from '@hooks/useGameAccounts'
import { CharacterInfoButton } from '@atoms/CharacterInfoButton'
import { CharacterInfoModal } from '@organisms/CharacterInfoModal'
import { Button } from '@ui/button'
import { BodyText } from '@atoms/BodyText'
import usePagination from '@hooks/usePagination'
import { PaginationBar } from '@atoms/PaginationBar'

/** The mobile view of the game accounts table. `GameAccountsTable` covers the desktop/tablet version. */
const GameAccountsTableMobile = (props: GameAccountsTableProps) => {
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

  const handleRename = (account: PlayerDataRow) => {
    // Show a modal which handles the rename
    showRenameModal(account)
  }

  const handleUpdatePassword = (account: PlayerDataRow) => {
    showPasswordModal(account)
  }

  const handleCharacterInfoClick = (account: PlayerDataRow) => {
    showCharacterInfoModal(account)
  }

  if (isLoading) {
    return (
      <div className='md:hidden'>
        <Spinner />
      </div>
    )
  } else if (accounts && accounts.length < 1) {
    return <BodyText className='md:hidden'>You don&apos;t have any accounts right now. Why not create one?</BodyText>
  }

  return (
    <div className='flex flex-wrap gap-4 md:hidden'>
      {accounts?.slice(startingRecord, endingRecord).map(account => (
        <table aria-label='Player Account' key={`mobile-${account.id}`} className='border-foreground w-full border'>
          <tbody>
            <GameAccountRowMobile account={account} rowLabel='Id' rowValue={account.id} />
            <GameAccountRowMobile account={account} rowLabel='Account Name' rowValue={account.username} />
            <GameAccountRowMobile account={account} rowLabel='Combat Level' rowValue={account.combat} />
            <GameAccountRowMobile
              account={account}
              rowLabel='Last Login'
              rowValue={getPrettyDateStringFromMillis(account.login_date)}
            />
            <GameAccountRowMobile
              account={account}
              rowLabel='Rename?'
              rowValue={<Button onClick={() => handleRename(account)}>Rename</Button>}
            />
            <GameAccountRowMobile
              account={account}
              rowLabel='Password'
              rowValue={<Button onClick={() => handleUpdatePassword(account)}>Update</Button>}
            />
            <GameAccountRowMobile
              account={account}
              rowLabel='Info'
              rowValue={<CharacterInfoButton handleClick={() => handleCharacterInfoClick(account)} />}
            />
          </tbody>
        </table>
      ))}
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

export default GameAccountsTableMobile
