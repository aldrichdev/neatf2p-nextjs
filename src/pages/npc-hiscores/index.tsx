import { ContentBlock } from '@atoms/ContentBlock'
import { useEffect, useState } from 'react'
import { HiscoresPageContainer } from '@styledPages/hiscores.styled'
import { NpcHiscoreType, NpcHiscoreTypes } from '@globalTypes/Hiscores/HiscoreType'
import { useRouter } from 'next/router'
import { Spinner } from '@molecules/Spinner'
import { PlayerLookup } from '@molecules/PlayerLookup'
import { PageHeading } from '@atoms/PageHeading'
import { push } from '@helpers/router'
import { renderHead } from '@helpers/renderUtils'
import useNpcHiscores from '@hooks/useNpcHiscores'
import NpcHiscoresMenu from '@atoms/NpcHiscoresMenu/NpcHiscoresMenu'
import { getNpcNameById } from '@helpers/hiscores/hiscoresUtils'
import { NpcHiscoresTable } from '@atoms/NpcHiscoresTable'

const NpcHiscores = () => {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { query } = router
  const [hiscoresPage, setHiscoresPage] = useState(1)
  const isNpcHiscoreType = (x: number | readonly number[]): x is NpcHiscoreType =>
    NpcHiscoreTypes.includes(x as NpcHiscoreType)
  const [npcHiscoreType, setNpcHiscoreType] = useState<NpcHiscoreType>(3)
  const hiscores = useNpcHiscores(setIsLoading, npcHiscoreType)

  const handleMenuItemClick = (npcHiscoreType: NpcHiscoreType) => {
    setNpcHiscoreType(npcHiscoreType)
    setHiscoresPage(1)
    router.query.page = '1'
    router.query.npc = Array.isArray(npcHiscoreType) ? npcHiscoreType.join(',') : npcHiscoreType.toString()
    push(router, '/npc-hiscores', router.query)
  }

  useEffect(() => {
    if (query.npc) {
      // Array
      if (typeof query.npc === 'string' && query.npc?.includes(',')) {
        if (query.npc.includes('4') && query.npc.includes('153') && query.npc.includes('154')) {
          setNpcHiscoreType([4, 153, 154])
        }

        if (query.npc.includes('66') && query.npc.includes('189')) {
          setNpcHiscoreType([66, 189])
        }

        if (query.npc.includes('22') && query.npc.includes('181')) {
          setNpcHiscoreType([22, 181])
        }
        // Number
      } else if (typeof query.npc === 'string' && !isNaN(Number(query.npc)) && isNpcHiscoreType(Number(query.npc))) {
        setNpcHiscoreType(Number(query.npc) as NpcHiscoreType)
      } else {
        setNpcHiscoreType(3)
      }
    } else {
      setNpcHiscoreType(3)
    }
  }, [query])

  return (
    <>
      {renderHead('NPC Hiscores')}
      <ContentBlock isWide>
        <PageHeading>{`${getNpcNameById(npcHiscoreType)} Kill Hiscores`}</PageHeading>
        <HiscoresPageContainer>
          <NpcHiscoresMenu activeNpcHiscoreType={npcHiscoreType} buttonOnClick={handleMenuItemClick} />
          {isLoading || !hiscores ? (
            <Spinner hiscores />
          ) : (
            <NpcHiscoresTable
              hiscores={hiscores}
              npcHiscoreType={npcHiscoreType}
              page={query.page ? Number(query.page) : hiscoresPage}
              setPage={setHiscoresPage}
            />
          )}
          <PlayerLookup isNpcHiscores />
        </HiscoresPageContainer>
      </ContentBlock>
    </>
  )
}

export default NpcHiscores
