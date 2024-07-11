import { BackToLink } from '@atoms/BackToLink/BackToLink'
import { BodyText } from '@atoms/BodyText'
import { ContentBlock } from '@atoms/ContentBlock'
import { PageHeading } from '@atoms/PageHeading'
import { PlayerHiscoreTable } from '@atoms/PlayerHiscoreTable'
import { NpcHiscoreType, NpcHiscoreTypes } from '@globalTypes/Hiscores/HiscoreType'
import { compareNpcHiscores, getNpcNameById, groupByUsername } from '@helpers/hiscores/hiscoresUtils'
import { renderHead } from '@helpers/renderUtils'
import { Spinner } from '@molecules/Spinner'
import { PlayerHiscoreTableContainer } from '@styledPages/hiscores.styled'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { PlayerNpcHiscoreRow } from '@globalTypes/Hiscores/PlayerNpcHiscoreRow'
import useNpcHiscores from '@hooks/useNpcHiscores'
import { NpcHiscoreDataRow } from '@globalTypes/Database/NpcHiscoreDataRow'
import { HiscoreTableCell } from '@atoms/NpcHiscoresTable/HiscoresTable.styled'
import { HiscoreTableRow } from '@atoms/PlayerHiscoreTable/PlayerHiscoreTable.styled'
import { NpcHiscoreLink } from '@styledPages/npcHiscoresPlayer'

const PlayerNpcHiscore = () => {
  const { query } = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const allNpcHiscores = useNpcHiscores()
  const [playerNpcHiscoreRows, setPlayerNpcHiscoreRows] = useState<PlayerNpcHiscoreRow[] | undefined>()
  const accountName = query.accountName as string

  const isMatchingUser = (hiscoreDataRow: NpcHiscoreDataRow) =>
    hiscoreDataRow.username.toLowerCase() === accountName.toLowerCase()

  const getRank = (npcHiscoreType: NpcHiscoreType) => {
    let hiscoresFilteredByType

    if (Array.isArray(npcHiscoreType)) {
      hiscoresFilteredByType = allNpcHiscores?.filter(hiscore => npcHiscoreType.includes(hiscore.npcID))
    } else {
      hiscoresFilteredByType = allNpcHiscores?.filter(hiscore => hiscore.npcID === npcHiscoreType)
    }

    if (!hiscoresFilteredByType) return '--'

    // Now group by username and sort by killCount
    const groupedAndSortedHiscores = groupByUsername(hiscoresFilteredByType).sort((obj1, obj2) =>
      compareNpcHiscores(obj1, obj2),
    )

    // Now get the rank, by finding the index of the current account name in the list
    const rank = groupedAndSortedHiscores?.findIndex(isMatchingUser)

    if (rank === undefined || rank < 0) return '--'

    return rank + 1
  }

  const getKillCount = (npcHiscoreType: NpcHiscoreType) => {
    let hiscoresFilteredByType

    if (Array.isArray(npcHiscoreType)) {
      hiscoresFilteredByType = allNpcHiscores?.filter(hiscore => npcHiscoreType.includes(hiscore.npcID))
    } else {
      hiscoresFilteredByType = allNpcHiscores?.filter(hiscore => hiscore.npcID === npcHiscoreType)
    }

    if (!hiscoresFilteredByType) return '--'

    // Group by username, then filter to the current user
    const groupedAndSortedHiscores = groupByUsername(hiscoresFilteredByType)?.filter(isMatchingUser)
    if (!groupedAndSortedHiscores) return '0'

    return groupedAndSortedHiscores?.[0]?.killCount.toLocaleString()
  }

  const getPlayerNpcHiscoreRow = (npcHiscoreType: NpcHiscoreType) => ({
    npcId: npcHiscoreType,
    npcName: getNpcNameById(npcHiscoreType),
    rank: getRank(npcHiscoreType),
    killCount: getKillCount(npcHiscoreType),
  })

  useEffect(() => {
    if (!allNpcHiscores) return

    const playerNpcHiscoreRowArray: PlayerNpcHiscoreRow[] = []

    NpcHiscoreTypes.map(npcHiscoreType => {
      playerNpcHiscoreRowArray.push(getPlayerNpcHiscoreRow(npcHiscoreType))
    })

    setPlayerNpcHiscoreRows(playerNpcHiscoreRowArray)
    setIsLoading(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allNpcHiscores])

  if (isLoading) {
    return (
      <>
        {renderHead('Player NPC Hiscore')}
        <Spinner />
      </>
    )
  }

  console.log(
    'accountName',
    accountName,
    'typeof accountName',
    typeof accountName,
    'playerNpcHiscoreRows',
    playerNpcHiscoreRows,
    '!allNpcHiscores?.find(isMatchingUser)',
    !allNpcHiscores?.find(isMatchingUser),
  )

  return (
    <>
      {renderHead('Player NPC Hiscore')}
      <ContentBlock>
        <PageHeading>{accountName ? accountName.toString() : 'Unknown Player'}</PageHeading>
        {typeof accountName !== 'string' || !playerNpcHiscoreRows || !allNpcHiscores?.find(isMatchingUser) ? (
          <BodyText variant='body' bodyTextAlign='center'>
            No hiscore found for this player.
          </BodyText>
        ) : (
          <>
            <PlayerHiscoreTableContainer>
              <PlayerHiscoreTable
                accountName={accountName}
                columns={
                  <>
                    <HiscoreTableCell sx={{ fontWeight: 700 }} isNpcHiscores>
                      NPC
                    </HiscoreTableCell>
                    <HiscoreTableCell sx={{ fontWeight: 700 }} isNpcHiscores>
                      Rank
                    </HiscoreTableCell>
                    <HiscoreTableCell sx={{ fontWeight: 700 }} isNpcHiscores>
                      Kills
                    </HiscoreTableCell>
                  </>
                }
                body={playerNpcHiscoreRows.map(playerNpcHiscoreRow => (
                  <HiscoreTableRow key={playerNpcHiscoreRow.npcName} isNpcHiscores>
                    <HiscoreTableCell isNpcHiscores>
                      <NpcHiscoreLink href={`/npc-hiscores?npc=${playerNpcHiscoreRow.npcId}`}>
                        {playerNpcHiscoreRow.npcName}
                      </NpcHiscoreLink>
                    </HiscoreTableCell>
                    <HiscoreTableCell isNpcHiscores>{playerNpcHiscoreRow.rank}</HiscoreTableCell>
                    <HiscoreTableCell isNpcHiscores>{playerNpcHiscoreRow.killCount}</HiscoreTableCell>
                  </HiscoreTableRow>
                ))}
                isNpcHiscores
              />
            </PlayerHiscoreTableContainer>
          </>
        )}
        <BackToLink href='/npc-hiscores'>{'<'} Return to Hiscores</BackToLink>
      </ContentBlock>
    </>
  )
}

export default PlayerNpcHiscore
