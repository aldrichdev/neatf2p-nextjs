import { BackToLink } from '@atoms/BackToLink/BackToLink'
import { BodyText } from '@atoms/BodyText'
import { ContentBlock } from '@atoms/ContentBlock'
import { PageHeading } from '@atoms/PageHeading'
import { PlayerHiscoreTable } from '@atoms/PlayerHiscoreTable'
import { TextBanner } from '@atoms/TextBanner'
import { HiscoreDataRow } from '@globalTypes/Database/HiscoreDataRow'
import { HiscoresSortField } from '@globalTypes/Database/HiscoresSortField'
import { HiscoreType } from '@globalTypes/Hiscores/HiscoreType'
import { PlayerHiscoreRow } from '@globalTypes/Hiscores/PlayerHiscoreRow'
import { convertExp, getTotalExp, isNotBaselineExp } from '@helpers/hiscores/hiscoresUtils'
import { Spinner } from '@molecules/Spinner'
import { PlayerHiscoreTableContainer } from '@styledPages/hiscores.styled'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const PlayerHiscore = () => {
  const { query } = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [hiscoresData, setHiscoresData] = useState<HiscoreDataRow[] | undefined>()
  const [playerHiscores, setPlayerHiscores] = useState<PlayerHiscoreRow[] | undefined>()
  const accountName = query.accountName as string

  const isMatchingUser = (hiscoreDataRow: HiscoreDataRow) =>
    hiscoreDataRow.username.toLowerCase() === accountName.toLowerCase()

  const getRank = (hiscoreType: HiscoreType) => {
    // Order hiscoresData by hiscoreType descending
    const propName = hiscoreType === 'Overall' ? 'skill_total' : `${hiscoreType.toLowerCase()}xp`
    const sortedHiscoresData = hiscoresData
      ?.sort((obj1, obj2) => obj2[propName as keyof HiscoresSortField] - obj1[propName as keyof HiscoresSortField])
      .filter(hiscore => isNotBaselineExp(hiscore, propName))

    // Then get the index of the current player in that sorted list (and if 0-based, add 1), that's the rank.
    const rank = sortedHiscoresData?.findIndex(isMatchingUser)
    if (rank === undefined) return 0

    return rank + 1
  }

  const getLevel = (hiscoreType: HiscoreType) => {
    const playerHiscore = hiscoresData?.find(isMatchingUser)
    const propName = hiscoreType === 'Overall' ? 'skill_total' : hiscoreType.toLowerCase()

    if (!playerHiscore) return 0

    return playerHiscore[propName as keyof HiscoresSortField]
  }

  const getExp = (hiscoreType: HiscoreType) => {
    const playerHiscore = hiscoresData?.find(isMatchingUser)

    if (!playerHiscore) return '0'

    if (hiscoreType === 'Overall') {
      return convertExp(getTotalExp(playerHiscore))
    }

    return convertExp(playerHiscore[`${hiscoreType.toLowerCase()}xp` as keyof HiscoresSortField])
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

  useEffect(() => {
    setIsLoading(true)

    if (!accountName) return

    axios
      .post('/api/getPlayerHiscore', {
        username: accountName.toLowerCase(),
      })
      .then(response => {
        setHiscoresData(response?.data as HiscoreDataRow[])
        setIsLoading(false)
      })
      .catch((error: string) => console.log(`Error getting player hiscore: ${error}`))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountName])

  useEffect(() => {
    if (!hiscoresData) return

    const playerHiscoreRowArray: PlayerHiscoreRow[] = []
    playerHiscoreRowArray.push(getPlayerHiscoreRow('Overall'))
    playerHiscoreRowArray.push(getPlayerHiscoreRow('Attack'))
    playerHiscoreRowArray.push(getPlayerHiscoreRow('Defense'))
    playerHiscoreRowArray.push(getPlayerHiscoreRow('Strength'))
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
    return <Spinner />
  }

  return (
    <ContentBlock>
      <PageHeading>{accountName ? accountName.toString() : 'Unknown Player'}</PageHeading>
      {typeof accountName !== 'string' || !playerHiscores || !hiscoresData?.find(isMatchingUser) ? (
        <BodyText variant='body' textAlign='center'>
          No hiscore found for this player.
        </BodyText>
      ) : (
        <>
          <TextBanner>
            <span>
              This is an <strong>alpha tester</strong> account. These are temporary and will not be accessible in the
              full game.
            </span>
          </TextBanner>
          <PlayerHiscoreTableContainer>
            <PlayerHiscoreTable accountName={accountName} playerHiscores={playerHiscores} />
          </PlayerHiscoreTableContainer>
        </>
      )}
      <BackToLink href='/hiscores'>{'<'} Return to Hiscores</BackToLink>
    </ContentBlock>
  )
}

export default PlayerHiscore
