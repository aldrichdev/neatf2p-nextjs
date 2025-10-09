import { PlayerDataRow } from '@globalTypes/Database/PlayerDataRow'

export type CharacterInfoModalProps = {
  account: PlayerDataRow
  open: boolean
  setOpen: (open: boolean) => void
}
