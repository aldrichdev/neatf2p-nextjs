import { PlayerDataRow } from '@globalTypes/Database/PlayerDataRow'

export type GameAccountRowMobileProps = {
  account: PlayerDataRow
  // showRenameModal: (visible: boolean, account: PlayerDataRow) => void
  // showPasswordModal: (visible: boolean, account: PlayerDataRow) => void
  rowLabel: string
  rowValue: JSX.Element | string | number
}
