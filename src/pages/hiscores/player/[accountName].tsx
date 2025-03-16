import { BackToLink } from '@atoms/BackToLink/BackToLink'
import { BodyText } from '@atoms/BodyText'
import { ContentBlock } from '@atoms/ContentBlock'
import { HiscoreTableHeaderCell } from '@atoms/HiscoresTable/HiscoresTable.styled'
import { PageHeading } from '@atoms/PageHeading'
import { PageTabs } from '@atoms/PageTabs'
import { Tab } from '@atoms/PageTabs/PageTabs.types'
import { PlayerHiscoresRank } from '@atoms/PlayerHiscoresRank'
import { PlayerHiscoreTable } from '@atoms/PlayerHiscoreTable'
import {
  ExperienceCell,
  HiscoreSkillIcon,
  HiscoreSkillTableCell,
  HiscoreTableRow,
  PlayerHiscoreTableCell,
  SkillLink,
} from '@atoms/PlayerHiscoreTable/PlayerHiscoreTable.styled'
import { PlayerHiscoreDataRow } from '@globalTypes/Database/PlayerHiscoreDataRow'
import { PlayerHiscoresSortField } from '@globalTypes/Database/PlayerHiscoresSortField'
import { HiscoreType } from '@globalTypes/Hiscores/HiscoreType'
import { PlayerHiscoreRow } from '@globalTypes/Hiscores/PlayerHiscoreRow'
import { sendApiRequest } from '@helpers/api/apiUtils'
import { getPrettyDateStringFromMillis } from '@helpers/date/date'
import { compareHiscores, convertExp, getTotalExp, isNotBaselineExp } from '@helpers/hiscores/hiscoresUtils'
import { renderHead } from '@helpers/renderUtils'
import { redirectTo } from '@helpers/window'
import { HiscoresTabs } from '@models/HiscoresTabs'
import { Spinner } from '@molecules/Spinner'
import { PlayerHiscoreTableContainer } from '@styledPages/hiscores.styled'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const PlayerHiscore = () => {
  const { query } = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [hiscoresData, setHiscoresData] = useState<PlayerHiscoreDataRow[] | undefined>()
  const [playerHiscores, setPlayerHiscores] = useState<PlayerHiscoreRow[] | undefined>()
  const [lastLogin, setLastLogin] = useState<string>()
  const accountName = query.accountName as string

  const isMatchingUser = (hiscoreDataRow: PlayerHiscoreDataRow) =>
    hiscoreDataRow.username.toLowerCase() === accountName.toLowerCase()

  const getRank = (hiscoreType: HiscoreType) => {
    // Order hiscoresData by hiscoreType descending
    const propName = hiscoreType === 'Overall' ? 'skill_total' : `${hiscoreType.toLowerCase()}xp`
    const sortedHiscoresData = hiscoresData
      ?.filter(hiscore => isNotBaselineExp(hiscore, propName))
      .sort((obj1, obj2) => compareHiscores(hiscoreType, obj1, obj2))

    // Then get the index of the current player in that sorted list (and if 0-based, add 1), that's the rank.
    const rank = sortedHiscoresData?.findIndex(isMatchingUser)
    if (rank === undefined) return 0

    return rank + 1
  }

  const getLevel = (hiscoreType: HiscoreType) => {
    const playerHiscore = hiscoresData?.find(isMatchingUser)
    const propName = hiscoreType === 'Overall' ? 'skill_total' : hiscoreType.toLowerCase()

    if (!playerHiscore) return 0

    return playerHiscore[propName as keyof PlayerHiscoresSortField]
  }

  const getExp = (hiscoreType: HiscoreType) => {
    const playerHiscore = hiscoresData?.find(isMatchingUser)

    if (!playerHiscore) return '0'

    if (hiscoreType === 'Overall') {
      return convertExp(getTotalExp(playerHiscore))
    }

    return convertExp(playerHiscore[`${hiscoreType.toLowerCase()}xp` as keyof PlayerHiscoresSortField])
  }

  const getPlayerHiscoreRow = (hiscoreType: HiscoreType) => {
    const exp = getExp(hiscoreType)

    return {
      skill: hiscoreType,
      rank: exp === '0' ? 0 : getRank(hiscoreType),
      level: getLevel(hiscoreType),
      exp: getExp(hiscoreType),
    }
  }

  const getLoginDate = (response: { data: PlayerHiscoreDataRow[] }) =>
    response.data.find((row: PlayerHiscoreDataRow) => row.username.toLowerCase() === accountName.toLowerCase())
      ?.login_date

  const handleSetActiveTab = (tab: Tab) => {
    if (tab.label === 'NPC Kills') {
      redirectTo(`/npc-hiscores/player/${accountName}`)
    }
  }

  useEffect(() => {
    setIsLoading(true)

    if (!accountName) return

    sendApiRequest('POST', '/api/getPlayerHiscore', {
      username: accountName.toLowerCase(),
    })
      .then(response => {
        setHiscoresData(response?.data as PlayerHiscoreDataRow[])

        // Get player last login date
        const lastLoginMillis = getLoginDate(response)

        // A value of 0 means the user has never logged in - likewise for undefined
        if (!lastLoginMillis) {
          setLastLogin('Never')
        } else {
          const lastLogin = getPrettyDateStringFromMillis(lastLoginMillis)
          setLastLogin(lastLogin)
        }

        setIsLoading(false)
      })
      .catch((error: string) => console.log(`Error getting player hiscore: ${error}`))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountName])

  useEffect(() => {
    if (!hiscoresData) return

    const playerHiscoreRowArray: PlayerHiscoreRow[] = []
    playerHiscoreRowArray.push(getPlayerHiscoreRow('Overall'))
    playerHiscoreRowArray.push(getPlayerHiscoreRow('Hits'))
    playerHiscoreRowArray.push(getPlayerHiscoreRow('Ranged'))
    playerHiscoreRowArray.push(getPlayerHiscoreRow('Prayer'))
    playerHiscoreRowArray.push(getPlayerHiscoreRow('Magic'))
    playerHiscoreRowArray.push(getPlayerHiscoreRow('Cooking'))
    playerHiscoreRowArray.push(getPlayerHiscoreRow('Woodcut'))
    playerHiscoreRowArray.push(getPlayerHiscoreRow('Fishing'))
    playerHiscoreRowArray.push(getPlayerHiscoreRow('Firemaking'))
    playerHiscoreRowArray.push(getPlayerHiscoreRow('Crafting'))
    playerHiscoreRowArray.push(getPlayerHiscoreRow('Smithing'))
    playerHiscoreRowArray.push(getPlayerHiscoreRow('Mining'))

    setPlayerHiscores(playerHiscoreRowArray)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hiscoresData])

  if (isLoading) {
    return (
      <>
        {renderHead('Player Hiscore')}
        <Spinner />
      </>
    )
  }

  return (
    <>
      {renderHead('Player Hiscore')}
      <ContentBlock>
        <PageHeading>{accountName || 'Unknown Player'}</PageHeading>
        <PageTabs tabs={HiscoresTabs} activeTab={HiscoresTabs[0]} setActiveTab={tab => handleSetActiveTab(tab)} />
        {typeof accountName !== 'string' || !playerHiscores || !hiscoresData?.find(isMatchingUser) ? (
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
                    <HiscoreTableHeaderCell>Skill</HiscoreTableHeaderCell>
                    <HiscoreTableHeaderCell>Rank</HiscoreTableHeaderCell>
                    <HiscoreTableHeaderCell>Level</HiscoreTableHeaderCell>
                    <HiscoreTableHeaderCell>EXP</HiscoreTableHeaderCell>
                  </>
                }
                body={playerHiscores.map(playerHiscoreRow => (
                  <HiscoreTableRow key={playerHiscoreRow.skill}>
                    <HiscoreSkillTableCell>
                      <HiscoreSkillIcon src={`/img/skills/${playerHiscoreRow.skill}.png`} alt='' />
                      <SkillLink href={`/hiscores?skill=${playerHiscoreRow.skill}`}>{playerHiscoreRow.skill}</SkillLink>
                    </HiscoreSkillTableCell>
                    <PlayerHiscoreTableCell>
                      <PlayerHiscoresRank rank={playerHiscoreRow.rank} />
                    </PlayerHiscoreTableCell>
                    <PlayerHiscoreTableCell>{playerHiscoreRow.level}</PlayerHiscoreTableCell>
                    <ExperienceCell>{playerHiscoreRow.exp}</ExperienceCell>
                  </HiscoreTableRow>
                ))}
              />
            </PlayerHiscoreTableContainer>
            <BodyText variant='body' bodyTextAlign='center'>
              <strong>Last Login:</strong> {lastLogin}
            </BodyText>
          </>
        )}
        <BackToLink href='/hiscores'>{'<'} Return to Hiscores</BackToLink>
      </ContentBlock>
    </>
  )
}

export default PlayerHiscore
