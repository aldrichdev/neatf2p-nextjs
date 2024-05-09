import { PlayerDataRow } from '@globalTypes/Database/PlayerDataRow'

export type GameAccountRowProps = {
  account: PlayerDataRow
  showRenameModal: (account: PlayerDataRow) => void
  showPasswordModal: (account: PlayerDataRow) => void
  showCharacterInfoModal: (account: PlayerDataRow) => void
}
