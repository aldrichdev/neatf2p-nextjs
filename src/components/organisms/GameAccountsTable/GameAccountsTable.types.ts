import { PlayerDataRow } from '@globalTypes/Database/PlayerDataRow'
import { User } from '@globalTypes/User'

export type GameAccountsTableProps = {
  user?: User
  activeAccount: PlayerDataRow | undefined
  renameModalVisible: boolean
  passwordModalVisible: boolean
  setRenameModalVisible: (open: boolean) => void
  setPasswordModalVisible: (open: boolean) => void
  showRenameModal: (visible: boolean, account: PlayerDataRow) => void
  showPasswordModal: (visible: boolean, account: PlayerDataRow) => void
}
