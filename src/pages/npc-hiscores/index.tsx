import { ContentBlock } from '@atoms/ContentBlock'
import { useEffect, useState } from 'react'
import { HiscoresPageContainer } from '@styledPages/hiscores.styled'
import { HiscoresTable } from '@atoms/HiscoresTable'
import { HiscoresMenu } from '@atoms/HiscoresMenu'
import useHiscores from '@hooks/useHiscores'
import { HiscoreType, NpcHiscoreLookupTable, NpcHiscoreType, NpcHiscoreTypes } from '@globalTypes/Hiscores/HiscoreType'
import { useRouter } from 'next/router'
import { Spinner } from '@molecules/Spinner'
import { PlayerLookup } from '@molecules/PlayerLookup'
import { PageHeading } from '@atoms/PageHeading'
import { push } from '@helpers/router'
import { renderHead } from '@helpers/renderUtils'
import useNpcHiscores from '@hooks/useNpcHiscores'

const NpcHiscores = () => {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { query } = router
  const [hiscoresPage, setHiscoresPage] = useState(1)
  const isNpcHiscoreType = (x: number | readonly number[]): x is NpcHiscoreType =>
    NpcHiscoreTypes.includes(x as NpcHiscoreType)
  const [npcHiscoreType, setNpcHiscoreType] = useState<NpcHiscoreType>(3)
  const hiscores = useNpcHiscores(npcHiscoreType, setIsLoading)

  const handleMenuItemClick = (npcHiscoreType: NpcHiscoreType) => {
    setNpcHiscoreType(npcHiscoreType)
    setHiscoresPage(1)
    router.query.page = '1'
    router.query.npc = npcHiscoreType.toString()
    push(router, '/npc-hiscores', router.query)
  }

  useEffect(() => {
    if (query.npc) {
      setNpcHiscoreType(
        typeof query.npc === 'string' && !isNaN(Number(query.npc)) && isNpcHiscoreType(Number(query.npc))
          ? (Number(query.npc) as NpcHiscoreType)
          : 3,
      )
    } else {
      setNpcHiscoreType(3)
    }
  }, [query])

  return (
    <>
      {renderHead('NPC Hiscores')}
      <ContentBlock isWide>
        <PageHeading>{`${NpcHiscoreLookupTable.get(npcHiscoreType)} Hiscores`}</PageHeading>
        <HiscoresPageContainer>
          <HiscoresMenu hiscoreType={npcHiscoreType} buttonOnClick={handleMenuItemClick} />
          {isLoading || !hiscores ? (
            <Spinner hiscores />
          ) : (
            <HiscoresTable
              hiscores={hiscores}
              hiscoreType={hiscoreType}
              page={query.page ? Number(query.page) : hiscoresPage}
              setPage={setHiscoresPage}
            />
          )}
          <PlayerLookup />
        </HiscoresPageContainer>
      </ContentBlock>
    </>
  )
}

export default NpcHiscores

/**
 * Tables to include:
 * (Name - Id)
 * Chicken - 3
 * Hans - 5
 * Imp - 114
 * Goblin (7) - 62
 * Man - 11
 * Cow - 6
 * Mugger - 21
 * Rat (13) - 47
 * Monk - 93
 * Goblin (13) - 4 & 153 & 154
 * Dark Wizard (13) - 57
 * Barbarian - 76
 * Dwarf - 94
 * Dark Warrior - 199
 * Zombie (24) - 41
 * Dark Wizard (25) - 60
 * Hobgoblin - 67
 * Zombie (32) - 68
 * Deadly Red Spider - 99
 * Giant - 61
 * Moss Giant - 104
 * Gunthor the Brave - 78
 * Black Knight - 66 & 189 (IMPORTANT. Non-wild + Wild.)
 * Skeleton (54) - 195
 * White Knight - 102
 * Ice Warrior - 158
 * Chaos Dwarf - 190
 * Ice Giant - 135
 * Lesser Demon - 22 & 181
 * Greater Demon - 184
 */
