import { PlayerDataRow } from '@globalTypes/Database/PlayerDataRow'

export type GameAccountRowMobileProps = {
  account: PlayerDataRow
  rowLabel: string
  rowValue: JSX.Element | string | number
}
