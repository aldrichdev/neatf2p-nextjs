import { BackToLink } from '@atoms/BackToLink/BackToLink'
import { BodyText } from '@atoms/BodyText'
import { ContentBlock } from '@atoms/ContentBlock'
import { PlayerHiscoreTable } from '@organisms/PlayerHiscoreTable'
import { NpcHiscoreType, NpcHiscoreTypes } from '@globalTypes/Hiscores/HiscoreType'
import {
  compareNpcHiscores,
  filterGroupAndSortHiscores,
  getNpcNameByIdForMenuKey,
  groupByUsername,
} from '@utils/hiscores/hiscoresUtils'
import { renderHead } from '@utils/renderUtils'
import { useEffect, useState } from 'react'
import { PlayerNpcHiscoreRow } from '@globalTypes/Hiscores/PlayerNpcHiscoreRow'
import { NpcHiscoreDataRow } from '@globalTypes/Database/NpcHiscoreDataRow'
import { HiscoreTableHeaderCell } from '@molecules/HiscoresTable/HiscoresTable.styled'
import { PageTabs } from '@atoms/PageTabs'
import { redirectTo } from '@utils/window'
import { Tab } from '@atoms/PageTabs/PageTabs.types'
import { HiscoresTabs } from '@models/HiscoresTabs'
import { GetServerSideProps } from 'next'
import { getWebsiteBaseUrl } from '@utils/envUtils'
import { HiscoreTabsContainer } from '@styledPages/hiscores.styled'
import { PlayerHiscoreHeader } from '@molecules/PlayerHiscoreHeader'
import { PlayerStatCardProps } from '@atoms/PlayerStatCard/PlayerStatCard.types'
import { formatExp } from '@utils/string/stringUtils'
import { NpcPlayerHiscoreFilterBar } from '@atoms/NpcPlayerHiscoreFilterBar'
import { NpcPlayerHiscoreFilter } from '@atoms/NpcPlayerHiscoreFilterBar/NpcPlayerHiscoreFilterBar.types'
import { SectionDivider } from '@atoms/SectionDivider'
import { NpcPlayerHiscoreRows } from '@atoms/NpcPlayerHiscoreRows'

type PlayerNpcHiscorePageProps = {
  accountName: string
  allNpcHiscores: NpcHiscoreDataRow[]
  lastLoginMillis: number
}

const PlayerNpcHiscorePage = ({ accountName, allNpcHiscores, lastLoginMillis }: PlayerNpcHiscorePageProps) => {
  const [playerNpcHiscoreRows, setPlayerNpcHiscoreRows] = useState<PlayerNpcHiscoreRow[] | undefined>()
  const [search, setSearch] = useState<string>('')
  const [activeFilter, setActiveFilter] = useState<NpcPlayerHiscoreFilter>('All')

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

    if (!hiscoresFilteredByType) return 0

    // Group by username, then filter to the current user
    const groupedAndSortedHiscores = groupByUsername(hiscoresFilteredByType)?.filter(isMatchingUser)
    const killCount = groupedAndSortedHiscores?.[0]?.killCount

    if (!killCount) return 0

    return killCount // .toLocaleString() - to show large numbers with commas - that can be applied later when we render it!
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

  const totalKills = playerNpcHiscoreRows?.reduce((acc, row) => acc + row.killCount, 0)
  const totalKillsShorthand = formatExp(totalKills || 0)
  const totalUniqueNpcCount = playerNpcHiscoreRows?.length || 0
  const rankedNpcHiscores = playerNpcHiscoreRows?.filter(row => row.killCount > 0)
  const npcHiscoresWithZeroKills = playerNpcHiscoreRows?.filter(row => row.killCount === 0)
  const countOfNpcsWithZeroKills = npcHiscoresWithZeroKills?.length || 0
  const npcsSlain = totalUniqueNpcCount - countOfNpcsWithZeroKills
  const highestRankedNpcHiscore = playerNpcHiscoreRows
    ?.filter(row => row.rank > 0)
    ?.sort((a, b) => a.rank - b.rank)
    .slice(0, 1)?.[0]
  const highestRank = highestRankedNpcHiscore?.rank || 0
  const highestRankNpc = highestRankedNpcHiscore?.npcName || ''
  const rankedNpcCount = rankedNpcHiscores?.length || 0
  const searchedRankedNpcHiscores = rankedNpcHiscores?.filter(
    hiscore => hiscore.npcName?.toLowerCase().includes(search.toLowerCase()),
  )
  const searchedNpcHiscoresWithZeroKills = npcHiscoresWithZeroKills?.filter(
    hiscore => hiscore.npcName?.toLowerCase().includes(search.toLowerCase()),
  )

  // If "Top 3" is selected, we want to change the results in the Ranked table to be just the top 3 ranks!
  // So we want to change the rows passed to that table to be:
  // (if top 3 is not selected, searchedRankedNpcHiscores; otherwise,
  // sort searchedRankedNpcHiscores alphabetically by rank and then take the first 3 rows)
  const rankedTableRows =
    activeFilter === 'Top 3'
      ? searchedRankedNpcHiscores?.sort((a, b) => a.rank - b.rank).slice(0, 3)
      : searchedRankedNpcHiscores

  const statCards: PlayerStatCardProps[] = [
    {
      label: 'Total kills',
      children: totalKillsShorthand,
      footnote: `${totalKills?.toLocaleString()} total`,
    },
    {
      label: 'Npcs slain',
      children: npcsSlain,
      footnote: `of ${totalUniqueNpcCount} NPCs`,
    },
    {
      label: 'Top rank',
      children: highestRank > 0 ? `#${highestRank}` : '--',
      footnote: highestRank > 0 ? highestRankNpc : 'Not ranked',
      isRank: true,
    },
  ]

  console.log(
    'search',
    search,
    'activeFilter',
    activeFilter,
    playerNpcHiscoreRows?.filter(row => row.rank > 0)?.sort((a, b) => a.rank - b.rank),
    'highestRankedNpcHiscore',
    highestRankedNpcHiscore,
  )

  return (
    <>
      {renderHead(`${accountName} | NPC Hiscores`, `NPC kill rankings for ${accountName}.`)}
      <ContentBlock>
        <HiscoreTabsContainer>
          <PageTabs tabs={HiscoresTabs} activeTab={HiscoresTabs[1]} setActiveTab={tab => handleSetActiveTab(tab)} />
        </HiscoreTabsContainer>
        {typeof accountName !== 'string' || !allNpcHiscores?.find(isMatchingUser) ? (
          <BodyText variant='body' bodyTextAlign='center'>
            No hiscore found for this player.
          </BodyText>
        ) : (
          <>
            <PlayerHiscoreHeader
              isLoading={!playerNpcHiscoreRows}
              accountName={accountName}
              lastLoginMillis={lastLoginMillis}
              statCards={statCards}
            />
            <NpcPlayerHiscoreFilterBar
              isLoading={!playerNpcHiscoreRows}
              search={search}
              setSearch={setSearch}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
            />

            {searchedRankedNpcHiscores && searchedRankedNpcHiscores.length > 0 && (
              <>
                {/** Ranked Table */}
                <SectionDivider leftText='Ranked' rightText={`${rankedNpcCount} NPCs`} />
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
                  body={<NpcPlayerHiscoreRows playerNpcHiscoreRows={rankedTableRows} />}
                />
              </>
            )}

            {searchedNpcHiscoresWithZeroKills &&
              searchedNpcHiscoresWithZeroKills.length > 0 &&
              activeFilter === 'All' && (
                <>
                  {/** No Kills Table */}
                  <SectionDivider leftText='No Kills' rightText={`${countOfNpcsWithZeroKills} NPCs`} />
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
                    body={
                      <NpcPlayerHiscoreRows
                        playerNpcHiscoreRows={npcHiscoresWithZeroKills?.filter(
                          hiscore => hiscore.npcName?.toLowerCase().includes(search.toLowerCase()),
                        )}
                      />
                    }
                  />
                </>
              )}
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

  // Get player last login date as a millis number.
  // A value of 0 for millis means the user has never logged in. Likewise for undefined.
  const lastLoginMillis = rawHiscores.find(
    (row: NpcHiscoreDataRow) => row.username.toLowerCase() === accountName.toLowerCase(),
  )?.login_date

  return {
    props: {
      accountName,
      allNpcHiscores,
      lastLoginMillis: lastLoginMillis || 0,
    },
  }
}
