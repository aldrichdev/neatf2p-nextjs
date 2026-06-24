import { GameAccountsTableCell } from '@atoms/GameAccountsTableCell'
import { GameAccountRowMobileProps } from './GameAccountRowMobile.types'

const GameAccountRowMobile = (props: GameAccountRowMobileProps) => {
  const { rowLabel, rowValue } = props

  return (
    <tr className='last:[&_td]:border-0 last:[&_th]:border-0'>
      <GameAccountsTableCell bold>{rowLabel}</GameAccountsTableCell>
      <GameAccountsTableCell>{rowValue}</GameAccountsTableCell>
    </tr>
  )
}

export default GameAccountRowMobile
