import { PlayerHiscoresRank } from '@atoms/PlayerHiscoresRank'
import { PlayerHiscoreTableRowsSkeleton } from '@atoms/PlayerHiscoreTableRowsSkeleton'
import { getNpcNameByIdForMenuKey } from '@utils/hiscores/hiscoresUtils'
import { useRouter } from 'next/router'
import { NpcPlayerHiscoreRowsProps } from './NpcPlayerHiscoreRows.types'
import clsx from 'clsx'
import { hiscoresValueCellClass } from '../../../consts/styles/hiscores'

/** A component encapsulating the rows that appear in the NPC player hiscores tables. */
const NpcPlayerHiscoreRows = (props: NpcPlayerHiscoreRowsProps) => {
  const { playerNpcHiscoreRows } = props
  const router = useRouter()

  if (!playerNpcHiscoreRows) {
    // The below skeleton technically has 4 columns, but it looks good enough that we can use it here too
    return <PlayerHiscoreTableRowsSkeleton />
  }

  return (
    <>
      {playerNpcHiscoreRows.map(playerNpcHiscoreRow => (
        <tr
          key={playerNpcHiscoreRow.npcName}
          onClick={() => router.push(`/npc-hiscores?npc=${playerNpcHiscoreRow.npcId}`)}
          className={clsx(
            'grid grid-cols-[50%_20%_30%] text-[14px]',
            'border-divider h-fit items-center border-b-[0.5px]',
            'last:border-b-0',
            'hover:bg-divider cursor-pointer',
            'md:text-[16px]',
          )}
        >
          <td className={clsx(hiscoresValueCellClass, 'font-medium')}>
            {getNpcNameByIdForMenuKey(playerNpcHiscoreRow.npcId)}
          </td>
          <td className={hiscoresValueCellClass}>
            <PlayerHiscoresRank rank={playerNpcHiscoreRow.rank} />
          </td>
          <td className={hiscoresValueCellClass}>{playerNpcHiscoreRow.killCount.toLocaleString()}</td>
        </tr>
      ))}
    </>
  )
}

export default NpcPlayerHiscoreRows
