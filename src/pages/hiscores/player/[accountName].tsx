import { BackToLink } from '@atoms/BackToLink/BackToLink'
import { BodyText } from '@atoms/BodyText'
import { ContentBlock } from '@atoms/ContentBlock'
import { HiscoreTableHeaderCell } from '@molecules/HiscoresTable/HiscoresTable.styled'
import { PageTabs } from '@atoms/PageTabs'
import { Tab } from '@atoms/PageTabs/PageTabs.types'
import { PlayerHiscoreTable } from '@organisms/PlayerHiscoreTable'
import { PlayerHiscoreDataRow } from '@globalTypes/Database/PlayerHiscoreDataRow'
import { getWebsiteBaseUrl } from '@utils/envUtils'
import { renderHead } from '@utils/renderUtils'
import { redirectTo } from '@utils/window'
import { HiscoresTabs } from '@models/HiscoresTabs'
import { HiscoreTabsContainer } from '@styledPages/hiscores.styled'
import { GetServerSideProps } from 'next'
import { formatExp } from '@utils/string/stringUtils'
import { PlayerHiscoreTableRowsSkeleton } from '@atoms/PlayerHiscoreTableRowsSkeleton'
import { PlayerHiscoreHeader } from '@molecules/PlayerHiscoreHeader'
import { StatisticCardProps } from '@atoms/StatisticCard/StatisticCard.types'
import { PlayerHiscoreTableRow } from '@atoms/PlayerHiscoreTableRow'
import { convertExp } from '@utils/hiscores/hiscoresUtils'

type PlayerHiscorePageProps = {
  accountName: string
  /** A single record containing all data on the player. `null` if the player does not exist. */
  playerHiscore: PlayerHiscoreDataRow | null
}

const PlayerHiscorePage = ({ accountName, playerHiscore }: PlayerHiscorePageProps) => {
  const handleSetActiveTab = (tab: Tab) => {
    if (tab.label === 'NPC Kills') {
      redirectTo(`/npc-hiscores/player/${accountName}`)
    }
  }

  const totalExp = convertExp(playerHiscore?.totalXp || 0)
  const totalExpShorthand = formatExp(totalExp)

  const statCards: StatisticCardProps[] = [
    {
      label: 'Overall rank',
      children: `#${playerHiscore?.overallRank || 0}`,
      footnote: 'of all players',
      isRank: true,
    },
    {
      label: 'Skill total',
      children: playerHiscore?.skill_total || 0,
      footnote: 'across 14 skills',
    },
    {
      label: 'Total exp',
      children: totalExpShorthand,
      footnote: `${totalExp} xp`,
    },
  ]

  return (
    <>
      {renderHead(
        `${typeof accountName !== 'string' || !playerHiscore ? 'Player Not Found' : accountName} | Player Hiscores`,
        `Skill rankings for ${accountName}.`,
      )}
      <ContentBlock>
        <HiscoreTabsContainer>
          <PageTabs tabs={HiscoresTabs} activeTab={HiscoresTabs[0]} setActiveTab={tab => handleSetActiveTab(tab)} />
        </HiscoreTabsContainer>
        {typeof accountName !== 'string' || !playerHiscore ? (
          <BodyText variant='body' bodyTextAlign='center'>
            No hiscore found for this player.
          </BodyText>
        ) : (
          <>
            <PlayerHiscoreHeader
              isLoading={!playerHiscore}
              accountName={accountName}
              lastLoginMillis={playerHiscore.login_date ?? 0}
              statCards={statCards}
            />
            <PlayerHiscoreTable
              accountName={accountName}
              columns={
                <>
                  <HiscoreTableHeaderCell>Skill</HiscoreTableHeaderCell>
                  <HiscoreTableHeaderCell>Rank</HiscoreTableHeaderCell>
                  <HiscoreTableHeaderCell>Level</HiscoreTableHeaderCell>
                  <HiscoreTableHeaderCell>EXP</HiscoreTableHeaderCell>
                </>
              }
              body={
                !playerHiscore ? (
                  <PlayerHiscoreTableRowsSkeleton />
                ) : (
                  <>
                    <PlayerHiscoreTableRow
                      skill='Overall'
                      rank={playerHiscore.overallRank}
                      level={playerHiscore.skill_total}
                      exp={playerHiscore.totalXp}
                    />
                    <PlayerHiscoreTableRow
                      skill='Hits'
                      rank={playerHiscore.hitsRank}
                      level={playerHiscore.hits}
                      exp={playerHiscore.hitsxp}
                    />
                    <PlayerHiscoreTableRow
                      skill='Ranged'
                      rank={playerHiscore.rangedRank}
                      level={playerHiscore.ranged}
                      exp={playerHiscore.rangedxp}
                    />
                    <PlayerHiscoreTableRow
                      skill='Prayer'
                      rank={playerHiscore.prayerRank}
                      level={playerHiscore.prayer}
                      exp={playerHiscore.prayerxp}
                    />
                    <PlayerHiscoreTableRow
                      skill='Magic'
                      rank={playerHiscore.magicRank}
                      level={playerHiscore.magic}
                      exp={playerHiscore.magicxp}
                    />
                    <PlayerHiscoreTableRow
                      skill='Cooking'
                      rank={playerHiscore.cookingRank}
                      level={playerHiscore.cooking}
                      exp={playerHiscore.cookingxp}
                    />
                    <PlayerHiscoreTableRow
                      skill='Woodcut'
                      rank={playerHiscore.woodcutRank}
                      level={playerHiscore.woodcut}
                      exp={playerHiscore.woodcutxp}
                    />
                    <PlayerHiscoreTableRow
                      skill='Fishing'
                      rank={playerHiscore.fishingRank}
                      level={playerHiscore.fishing}
                      exp={playerHiscore.fishingxp}
                    />
                    <PlayerHiscoreTableRow
                      skill='Firemaking'
                      rank={playerHiscore.firemakingRank}
                      level={playerHiscore.firemaking}
                      exp={playerHiscore.firemakingxp}
                    />
                    <PlayerHiscoreTableRow
                      skill='Crafting'
                      rank={playerHiscore.craftingRank}
                      level={playerHiscore.crafting}
                      exp={playerHiscore.craftingxp}
                    />
                    <PlayerHiscoreTableRow
                      skill='Smithing'
                      rank={playerHiscore.smithingRank}
                      level={playerHiscore.smithing}
                      exp={playerHiscore.smithingxp}
                    />
                    <PlayerHiscoreTableRow
                      skill='Mining'
                      rank={playerHiscore.miningRank}
                      level={playerHiscore.mining}
                      exp={playerHiscore.miningxp}
                    />
                  </>
                )
              }
            />
          </>
        )}
        <BackToLink href='/hiscores'>← Return to Hiscores</BackToLink>
      </ContentBlock>
    </>
  )
}

export default PlayerHiscorePage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const accountName = Array.isArray(params?.accountName) ? 'Unknown Player' : params?.accountName || 'Unknown Player'
  const fetchUrl = `${getWebsiteBaseUrl()}/api/getPlayerHiscore`
  const fetchBody = { username: accountName.toLowerCase() }

  const response = await fetch(fetchUrl, { method: 'POST', body: JSON.stringify(fetchBody) })
  const output: PlayerHiscoreDataRow[] = await response.json()

  if (output && Array.isArray(output) && output.length > 0) {
    return {
      props: {
        accountName,
        playerHiscore: output[0],
      },
    }
  } else {
    // An empty `output` array usually means the player does not exist, so we need to return null
    return {
      props: {
        accountName,
        playerHiscore: null,
      },
    }
  }
}
