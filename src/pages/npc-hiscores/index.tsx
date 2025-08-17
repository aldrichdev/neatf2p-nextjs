import { ContentBlock } from '@atoms/ContentBlock'
import { useState } from 'react'
import { NpcHiscoreType } from '@globalTypes/Hiscores/HiscoreType'
import { useRouter } from 'next/router'
import { PlayerLookup } from '@molecules/PlayerLookup'
import { PageHeading } from '@atoms/PageHeading'
import { push } from '@helpers/router'
import { renderHead } from '@helpers/renderUtils'
import NpcHiscoresMenu from '@atoms/NpcHiscoresMenu/NpcHiscoresMenu'
import {
  filterGroupAndSortHiscores,
  getNpcIdsByInitialId,
  getNpcNameById,
  isNpcHiscoreType,
} from '@helpers/hiscores/hiscoresUtils'
import { NpcHiscoresTable } from '@atoms/NpcHiscoresTable'
import { PageTabs } from '@atoms/PageTabs'
import { redirectTo } from '@helpers/window'
import { NpcKillsLevelMenu } from '@molecules/NpcKillsLevelMenu'
import { Tab } from '@atoms/PageTabs/PageTabs.types'
import { NpcHiscoresPageContainer } from '@styledPages/NpcHiscores.styled'
import { HiscoresTabs } from '@models/HiscoresTabs'
import { NpcHiscoreDataRow } from '@globalTypes/Database/NpcHiscoreDataRow'
import { GetServerSideProps } from 'next'
import { getWebsiteBaseUrl } from '@helpers/envUtils'
import { DEFAULT_NPC_ID } from 'src/consts'

type NpcHiscoresPageProps = {
  hiscores: NpcHiscoreDataRow[]
  npcHiscoreType: NpcHiscoreType
  npcSubTypes: (number | number[])[]
}

const NpcHiscores = ({ hiscores, npcHiscoreType, npcSubTypes }: NpcHiscoresPageProps) => {
  const router = useRouter()
  const { query } = router
  const [hiscoresPage, setHiscoresPage] = useState(1)
  const pageTitle = `${getNpcNameById(npcHiscoreType)} Kill Hiscores`

  const handleMenuItemClick = (npcHiscoreType: NpcHiscoreType) => {
    setHiscoresPage(1)
    router.query.page = '1'
    router.query.npc = Array.isArray(npcHiscoreType) ? npcHiscoreType.join(',') : npcHiscoreType.toString()
    push(router, '/npc-hiscores', router.query)
  }

  const handleSetActiveTab = (tab: Tab) => {
    if (tab.label === 'Skills') {
      redirectTo('/hiscores')
    }
  }

  return (
    <>
      {renderHead(pageTitle)}
      <ContentBlock isWide>
        <PageTabs tabs={HiscoresTabs} activeTab={HiscoresTabs[1]} setActiveTab={tab => handleSetActiveTab(tab)} />
        <PageHeading>{pageTitle}</PageHeading>
        <NpcHiscoresMenu activeNpcHiscoreType={npcHiscoreType} buttonOnClick={handleMenuItemClick} />
        <NpcKillsLevelMenu
          npcHiscoreType={npcHiscoreType}
          npcSubTypes={npcSubTypes.length > 0 ? npcSubTypes : [npcHiscoreType]}
          menuItemOnClick={handleMenuItemClick}
        />
        <NpcHiscoresPageContainer>
          <NpcHiscoresTable
            hiscores={hiscores}
            npcHiscoreType={npcHiscoreType}
            page={query.page ? Number(query.page) : hiscoresPage}
            setPage={setHiscoresPage}
          />
          <PlayerLookup isNpcHiscores />
        </NpcHiscoresPageContainer>
      </ContentBlock>
    </>
  )
}

export default NpcHiscores

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  let npcId: number | readonly number[] = DEFAULT_NPC_ID
  let initialId: number | string = DEFAULT_NPC_ID
  let npcSubTypes: (number | number[])[] = []

  if (query.npc && typeof query.npc === 'string') {
    if (!isNaN(Number(query.npc)) && isNpcHiscoreType(Number(query.npc))) {
      npcId = Number(query.npc)
      initialId = npcId
    } else if (query.npc.includes(',')) {
      // There can be strings of numbers which equate to npc hiscore types.
      npcId = query.npc.split(',').map(Number)
      initialId = query.npc
    }
  }

  const npcIdsForId = getNpcIdsByInitialId(initialId)

  // If the number we get in the query is one where there are multiple other npcs
  // of the same type but diff level, need to set npcSubTypes here.
  if (npcIdsForId.length > 0) {
    npcSubTypes = npcIdsForId
  }

  const typedNpcId = npcId as NpcHiscoreType
  const fetchUrl = `${getWebsiteBaseUrl()}/api/queryNpcHiscores`
  const res = await fetch(fetchUrl)
  const output = await res.json()

  const rawHiscores: NpcHiscoreDataRow[] = output ? (output as NpcHiscoreDataRow[]) : []
  const hiscores = filterGroupAndSortHiscores(rawHiscores, typedNpcId)

  return {
    props: {
      hiscores,
      npcHiscoreType: typedNpcId,
      npcSubTypes,
    },
  }
}
