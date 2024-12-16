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
import { getNpcIdsByInitialId, getNpcNameById } from '@helpers/hiscores/hiscoresUtils'
import { NpcHiscoresTable } from '@atoms/NpcHiscoresTable'
import { PageTabs } from '@atoms/PageTabs'
import { redirectTo } from '@helpers/window'
import { NpcKillsLevelMenu } from '@molecules/NpcKillsLevelMenu'
import { Tab } from '@atoms/PageTabs/PageTabs.types'
import { MobileOnly } from '@styledPages/NpcHiscores.styled'

const NpcHiscores = () => {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { query } = router
  const [hiscoresPage, setHiscoresPage] = useState(1)
  const isNpcHiscoreType = (x: number | readonly number[]): x is NpcHiscoreType =>
    NpcHiscoreTypes.includes(x as NpcHiscoreType)
  const [npcHiscoreType, setNpcHiscoreType] = useState<NpcHiscoreType>(29)
  const [npcSubTypes, setNpcSubTypes] = useState<(number | number[])[]>([])
  const hiscores = useNpcHiscores(setIsLoading, /*Array.isArray(npcHiscoreType) ? npcHiscoreType[0] :*/ npcHiscoreType)
  const pageTabs = [
    { id: 0, label: 'Player' },
    { id: 1, label: 'NPC Kills' },
  ]

  const handleMenuItemClick = (npcHiscoreType: NpcHiscoreType) => {
    setNpcHiscoreType(npcHiscoreType)
    setHiscoresPage(1)
    router.query.page = '1'
    router.query.npc = Array.isArray(npcHiscoreType) ? npcHiscoreType.join(',') : npcHiscoreType.toString()
    push(router, '/npc-hiscores', router.query)
  }

  const handleSetActiveTab = (tab: Tab) => {
    if (tab.label === 'Player') {
      redirectTo('/hiscores')
    }
  }

  useEffect(() => {
    console.log('query.npc', query.npc)

    if (query.npc && typeof query.npc === 'string') {
      let npcId: number | readonly number[] = 0
      let initialId: number | string = 0

      if (!isNaN(Number(query.npc)) && isNpcHiscoreType(Number(query.npc))) {
        npcId = Number(query.npc)
        initialId = npcId
      } else if (query.npc.includes(',')) {
        // There can be strings of numbers which equate to npc hiscore types.
        npcId = query.npc.split(',').map(Number)
        initialId = query.npc
      }

      console.log('npcId', npcId)

      const npcIdsForId = getNpcIdsByInitialId(initialId)

      console.log('npcIdsForId', npcIdsForId)

      // If the number we get in the query is one where there are multiple other npcs
      // of the same type but diff level, need to set npcSubTypes here.
      if (npcIdsForId.length > 0) {
        setNpcSubTypes(npcIdsForId)
      } else {
        setNpcSubTypes([])
      }

      setNpcHiscoreType(npcId as NpcHiscoreType)
    } else {
      setNpcHiscoreType(29)
    }
  }, [query])

  console.log('npcHiscoreType', npcHiscoreType)

  return (
    <>
      {renderHead('NPC Hiscores')}
      <ContentBlock isWide>
        <PageTabs tabs={pageTabs} activeTab={pageTabs[1]} setActiveTab={tab => handleSetActiveTab(tab)} />
        <PageHeading>{`${getNpcNameById(npcHiscoreType)} Kill Hiscores`}</PageHeading>
        {
          /**typeof npcHiscoreType === 'number' &&**/ npcSubTypes.length > 0 && (
            <NpcKillsLevelMenu
              npcHiscoreType={npcHiscoreType}
              npcSubTypes={npcSubTypes}
              menuItemOnClick={handleMenuItemClick}
            />
          )
        }
        <HiscoresPageContainer>
          <NpcHiscoresMenu activeNpcHiscoreType={npcHiscoreType} buttonOnClick={handleMenuItemClick} />
          <MobileOnly>
            {typeof npcHiscoreType === 'number' && npcSubTypes.length > 0 && (
              <NpcKillsLevelMenu
                npcHiscoreType={npcHiscoreType}
                npcSubTypes={npcSubTypes}
                menuItemOnClick={handleMenuItemClick}
              />
            )}
          </MobileOnly>
          {isLoading || !hiscores ? (
            <Spinner hiscores />
          ) : (
            <NpcHiscoresTable
              hiscores={hiscores}
              npcHiscoreType={/*Array.isArray(npcHiscoreType) ? npcHiscoreType[0] :*/ npcHiscoreType} // no i dont think we do!  // we want to change this to just the 1st item if its an array
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
