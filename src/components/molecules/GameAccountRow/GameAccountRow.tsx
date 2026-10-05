import { GameAccountsTableCell } from '@atoms/GameAccountsTableCell'
import { GameAccountRowProps } from './GameAccountRow.types'
import { getPrettyDateStringFromMillis } from '@utils/date/date'
import { HoverableIconButton } from '@atoms/HoverableIconButton'
import { ChevronDown, ChevronRight, Info, LockKeyhole, UserRoundPen } from 'lucide-react'
import { useState } from 'react'
import { Tooltip, TooltipContent, TooltipTrigger } from '@ui/tooltip'
import { Button } from '@ui/button'

const GameAccountRow = (props: GameAccountRowProps) => {
  const { account, showRenameModal, showPasswordModal, showCharacterInfoModal } = props
  const [rowExpanded, setRowExpanded] = useState<boolean>()

  const styles = {
    expandedRow: {
      gridCell: 'flex flex-wrap content-start gap-2',
      gridCellHeading: 'basis-full text-sm grow-0',
      linkButton: 'justify-start p-0',
    },
  }

  const handleRename = () => {
    showRenameModal(account)
  }

  const handleUpdatePassword = () => {
    showPasswordModal(account)
  }

  const handleCharacterInfoClick = () => {
    showCharacterInfoModal(account)
  }

  const handleMobileChevronClick = () => {
    setRowExpanded(!rowExpanded)
  }

  return (
    <>
      <tr>
        <GameAccountsTableCell className='lg:hidden'>
          {rowExpanded ? (
            <ChevronDown onClick={handleMobileChevronClick} />
          ) : (
            <ChevronRight onClick={handleMobileChevronClick} />
          )}
        </GameAccountsTableCell>
        <GameAccountsTableCell className='hidden font-mono lg:table-cell'>{account.id}</GameAccountsTableCell>
        <GameAccountsTableCell>{account.username}</GameAccountsTableCell>
        <GameAccountsTableCell>{account.combat}</GameAccountsTableCell>
        <GameAccountsTableCell className='hidden lg:table-cell'>
          {account.login_date === 0 ? '-' : getPrettyDateStringFromMillis(account.login_date)}
        </GameAccountsTableCell>
        <GameAccountsTableCell className='hidden lg:table-cell'>
          <div className='flex gap-3'>
            <Tooltip>
              <TooltipTrigger>
                <HoverableIconButton Icon={Info} handleClick={handleCharacterInfoClick} />
              </TooltipTrigger>
              <TooltipContent>Show Info</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <HoverableIconButton Icon={UserRoundPen} handleClick={handleRename} />
              </TooltipTrigger>
              <TooltipContent>Rename Account</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <HoverableIconButton Icon={LockKeyhole} handleClick={handleUpdatePassword} />
              </TooltipTrigger>
              <TooltipContent>Update Password</TooltipContent>
            </Tooltip>
          </div>
        </GameAccountsTableCell>
      </tr>
      {rowExpanded && (
        <>
          <tr className='bg-sidebar-bg text-left lg:hidden'>
            <td colSpan={3}>
              <div className='grid grid-cols-2 gap-2 p-2'>
                <div className={styles.expandedRow.gridCell}>
                  <strong className={styles.expandedRow.gridCellHeading}>Id</strong>
                  <p className='basis-full font-mono text-sm'>{account.id}</p>
                </div>
                <div className={styles.expandedRow.gridCell}>
                  <strong className={styles.expandedRow.gridCellHeading}>Last Login</strong>
                  <p className='basis-full text-sm'>
                    {account.login_date === 0 ? '-' : getPrettyDateStringFromMillis(account.login_date)}
                  </p>
                </div>
                <div className={styles.expandedRow.gridCell}>
                  <strong className={styles.expandedRow.gridCellHeading}>Actions</strong>
                  <div className='flex flex-col flex-wrap'>
                    <Button variant='link' className={styles.expandedRow.linkButton} onClick={handleCharacterInfoClick}>
                      <Info /> Show Info
                    </Button>
                    <Button variant='link' className={styles.expandedRow.linkButton} onClick={handleRename}>
                      <UserRoundPen /> Rename Account
                    </Button>
                    <Button variant='link' className={styles.expandedRow.linkButton} onClick={handleUpdatePassword}>
                      <LockKeyhole /> Update Password
                    </Button>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </>
      )}
    </>
  )
}

export default GameAccountRow
