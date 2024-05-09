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
  showRenameModal: (visible: boolean, account: PlayerDataRow) => void
  showPasswordModal: (visible: boolean, account: PlayerDataRow) => void
  showCharacterInfoModal: (visible: boolean, account: PlayerDataRow) => void
}
