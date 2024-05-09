import { PlayerDataRow } from '@globalTypes/Database/PlayerDataRow'

export type GameAccountRowProps = {
  account: PlayerDataRow
  showRenameModal: (visible: boolean, account: PlayerDataRow) => void
  showPasswordModal: (visible: boolean, account: PlayerDataRow) => void
  showCharacterInfoModal: (visible: boolean, account: PlayerDataRow) => void
}
