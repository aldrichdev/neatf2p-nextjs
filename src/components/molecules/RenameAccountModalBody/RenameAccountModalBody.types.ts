import { PlayerDataRow } from '@globalTypes/Database/PlayerDataRow'

export type RenameAccountModalBodyProps = {
  account: PlayerDataRow
  playerRenamedOnce: boolean
  playerRenamedMaximumAmount: boolean
  onRestoreUsername: () => void
  restoreSuccessMessage: string
  restoreErrorMessage: string
}
