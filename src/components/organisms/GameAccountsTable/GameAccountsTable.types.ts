import { PlayerDataRow } from '@globalTypes/Database/PlayerDataRow'
import { User } from '@globalTypes/User'

export type GameAccountsTableProps = {
  user?: User
  activeAccount: PlayerDataRow | undefined
  renameModalVisible: boolean
  passwordModalVisible: boolean
  characterInfoModalVisible: boolean
  setRenameModalVisible: (open: boolean) => void
  setPasswordModalVisible: (open: boolean) => void
  setCharacterInfoModalVisible: (open: boolean) => void
  showRenameModal: (account: PlayerDataRow) => void
  showPasswordModal: (account: PlayerDataRow) => void
  showCharacterInfoModal: (account: PlayerDataRow) => void
}
