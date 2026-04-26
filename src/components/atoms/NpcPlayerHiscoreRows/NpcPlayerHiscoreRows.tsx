import { PlayerHiscoresRank } from '@atoms/PlayerHiscoresRank'
import { PlayerHiscoreTableRowsSkeleton } from '@atoms/PlayerHiscoreTableRowsSkeleton'
import { HiscoreTableRow, PlayerHiscoreTableCell } from '@organisms/PlayerHiscoreTable/PlayerHiscoreTable.styled'
import { getNpcNameByIdForMenuKey } from '@utils/hiscores/hiscoresUtils'
import { useRouter } from 'next/router'
import { NpcPlayerHiscoreRowsProps } from './NpcPlayerHiscoreRows.types'

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
        <HiscoreTableRow
          key={playerNpcHiscoreRow.npcName}
          isNpcTable
          onClick={() => router.push(`/npc-hiscores?npc=${playerNpcHiscoreRow.npcId}`)}
        >
          <PlayerHiscoreTableCell sx={{ fontWeight: 500 }}>
            {getNpcNameByIdForMenuKey(playerNpcHiscoreRow.npcId)}
          </PlayerHiscoreTableCell>
          <PlayerHiscoreTableCell>
            <PlayerHiscoresRank rank={playerNpcHiscoreRow.rank} />
          </PlayerHiscoreTableCell>
          <PlayerHiscoreTableCell>{playerNpcHiscoreRow.killCount.toLocaleString()}</PlayerHiscoreTableCell>
        </HiscoreTableRow>
      ))}
    </>
  )
}

export default NpcPlayerHiscoreRows
