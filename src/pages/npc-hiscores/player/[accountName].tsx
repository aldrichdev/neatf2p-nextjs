import { BackToLink } from '@atoms/BackToLink/BackToLink'
import { BodyText } from '@atoms/BodyText'
import { ContentBlock } from '@atoms/ContentBlock'
import { PageHeading } from '@atoms/PageHeading'
import { PlayerHiscoreTable } from '@organisms/PlayerHiscoreTable'
import { NpcHiscoreType, NpcHiscoreTypes } from '@globalTypes/Hiscores/HiscoreType'
import {
  compareNpcHiscores,
  filterGroupAndSortHiscores,
  getNpcNameByIdForMenuKey,
  groupByUsername,
} from '@helpers/hiscores/hiscoresUtils'
import { renderHead } from '@helpers/renderUtils'
import { PlayerHiscoreTableContainer } from '@styledPages/hiscores.styled'
import { useEffect, useState } from 'react'
import { PlayerNpcHiscoreRow } from '@globalTypes/Hiscores/PlayerNpcHiscoreRow'
import { NpcHiscoreDataRow } from '@globalTypes/Database/NpcHiscoreDataRow'
import { HiscoreTableHeaderCell } from '@molecules/HiscoresTable/HiscoresTable.styled'
import {
  HiscoreTableRow,
  PlayerHiscoreTableCell,
  SkillLink,
} from '@organisms/PlayerHiscoreTable/PlayerHiscoreTable.styled'
import { PageTabs } from '@atoms/PageTabs'
import { redirectTo } from '@helpers/window'
import { Tab } from '@atoms/PageTabs/PageTabs.types'
import { PlayerHiscoresRank } from '@atoms/PlayerHiscoresRank'
import { HiscoresTabs } from '@models/HiscoresTabs'
import { GetServerSideProps } from 'next'
import { getWebsiteBaseUrl } from '@helpers/envUtils'

type PlayerNpcHiscorePageProps = {
  accountName: string
  allNpcHiscores: NpcHiscoreDataRow[]
}

const PlayerNpcHiscorePage = ({ accountName, allNpcHiscores }: PlayerNpcHiscorePageProps) => {
  const [playerNpcHiscoreRows, setPlayerNpcHiscoreRows] = useState<PlayerNpcHiscoreRow[] | undefined>()

  const isMatchingUser = (hiscoreDataRow: NpcHiscoreDataRow) =>
    hiscoreDataRow.username.toLowerCase() === accountName.toLowerCase()

  const getRank = (npcHiscoreType: NpcHiscoreType): number => {
    // Note: Zero, if returned, will be shown in the table as a double dash (--).
    let hiscoresFilteredByType

    if (Array.isArray(npcHiscoreType)) {
      hiscoresFilteredByType = allNpcHiscores?.filter(hiscore => npcHiscoreType.includes(hiscore.npcID))
    } else {
      hiscoresFilteredByType = allNpcHiscores?.filter(hiscore => hiscore.npcID === npcHiscoreType)
    }

    if (!hiscoresFilteredByType) return 0

    // Now group by username and sort by killCount
    const groupedAndSortedHiscores = groupByUsername(hiscoresFilteredByType).sort((obj1, obj2) =>
      compareNpcHiscores(obj1, obj2),
    )

    // Now get the rank, by finding the index of the current account name in the list
    const rank = groupedAndSortedHiscores?.findIndex(isMatchingUser)

    if (rank === undefined || rank < 0) return 0

    return rank + 1
  }

  const getKillCount = (npcHiscoreType: NpcHiscoreType) => {
    let hiscoresFilteredByType

    if (Array.isArray(npcHiscoreType)) {
      hiscoresFilteredByType = allNpcHiscores?.filter(hiscore => npcHiscoreType.includes(hiscore.npcID))
    } else {
      hiscoresFilteredByType = allNpcHiscores?.filter(hiscore => hiscore.npcID === npcHiscoreType)
    }

    if (!hiscoresFilteredByType) return '0'

    // Group by username, then filter to the current user
    const groupedAndSortedHiscores = groupByUsername(hiscoresFilteredByType)?.filter(isMatchingUser)
    const killCount = groupedAndSortedHiscores?.[0]?.killCount

    if (!killCount) return '0'

    return killCount.toLocaleString()
  }

  const getPlayerNpcHiscoreRow = (npcHiscoreType: NpcHiscoreType) => ({
    npcId: npcHiscoreType,
    npcName: getNpcNameByIdForMenuKey(npcHiscoreType),
    rank: getRank(npcHiscoreType),
    killCount: getKillCount(npcHiscoreType),
  })

  const handleSetActiveTab = (tab: Tab) => {
    if (tab.label === 'Skills') {
      redirectTo(`/hiscores/player/${accountName}`)
    }
  }

  useEffect(() => {
    if (!allNpcHiscores) return

    const playerNpcHiscoreRowArray: PlayerNpcHiscoreRow[] = []

    NpcHiscoreTypes.map(npcHiscoreType => {
      playerNpcHiscoreRowArray.push(getPlayerNpcHiscoreRow(npcHiscoreType))
    })

    setPlayerNpcHiscoreRows(playerNpcHiscoreRowArray)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allNpcHiscores])

  return (
    <>
      {renderHead(`${accountName} | NPC Hiscores`, `NPC kill rankings for ${accountName}.`)}
      <ContentBlock>
        <PageHeading>{accountName || 'Unknown Player'}</PageHeading>
        <PageTabs tabs={HiscoresTabs} activeTab={HiscoresTabs[1]} setActiveTab={tab => handleSetActiveTab(tab)} />
        {typeof accountName !== 'string' || !playerNpcHiscoreRows || !allNpcHiscores?.find(isMatchingUser) ? (
          <BodyText variant='body' bodyTextAlign='center'>
            No hiscore found for this player.
          </BodyText>
        ) : (
          <>
            <PlayerHiscoreTableContainer>
              <PlayerHiscoreTable
                isNpcTable
                accountName={accountName}
                columns={
                  <>
                    <HiscoreTableHeaderCell>NPC</HiscoreTableHeaderCell>
                    <HiscoreTableHeaderCell>Rank</HiscoreTableHeaderCell>
                    <HiscoreTableHeaderCell>Kills</HiscoreTableHeaderCell>
                  </>
                }
                body={playerNpcHiscoreRows.map(playerNpcHiscoreRow => (
                  <HiscoreTableRow key={playerNpcHiscoreRow.npcName} isNpcTable>
                    <PlayerHiscoreTableCell>
                      <SkillLink href={`/npc-hiscores?npc=${playerNpcHiscoreRow.npcId}`}>
                        {getNpcNameByIdForMenuKey(playerNpcHiscoreRow.npcId)}
                      </SkillLink>
                    </PlayerHiscoreTableCell>
                    <PlayerHiscoreTableCell>
                      <PlayerHiscoresRank rank={playerNpcHiscoreRow.rank} />
                    </PlayerHiscoreTableCell>
                    <PlayerHiscoreTableCell>{playerNpcHiscoreRow.killCount}</PlayerHiscoreTableCell>
                  </HiscoreTableRow>
                ))}
              />
            </PlayerHiscoreTableContainer>
          </>
        )}
        <BackToLink href='/npc-hiscores'>{'<'} Return to Hiscores</BackToLink>
      </ContentBlock>
    </>
  )
}

export default PlayerNpcHiscorePage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const accountName = Array.isArray(params?.accountName) ? 'Unknown Player' : params?.accountName || 'Unknown Player'

  // First fetch the data
  const fetchUrl = `${getWebsiteBaseUrl()}/api/queryNpcHiscores`
  const res = await fetch(fetchUrl)
  const output = await res.json()

  const rawHiscores: NpcHiscoreDataRow[] = output ? (output as NpcHiscoreDataRow[]) : []
  const allNpcHiscores = filterGroupAndSortHiscores(rawHiscores)

  return {
    props: {
      accountName,
      allNpcHiscores,
    },
  }
}
