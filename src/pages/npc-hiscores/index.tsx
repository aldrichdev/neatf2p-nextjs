import { useState } from 'react'
import { NpcHiscoreType } from '@globalTypes/Hiscores/HiscoreType'
import { useRouter } from 'next/router'
import { PlayerLookup } from '@atoms/PlayerLookup'
import { push } from '@utils/router'
import { renderHead } from '@utils/renderUtils'
import NpcHiscoresMenu from '@organisms/NpcHiscoresMenu/NpcHiscoresMenu'
import {
  filterGroupAndSortHiscores,
  getNpcIdsByInitialId,
  getNpcNameById,
  isNpcHiscoreType,
} from '@utils/hiscores/hiscoresUtils'
import { NpcHiscoresTable } from '@organisms/NpcHiscoresTable'
import { PageTabs } from '@atoms/PageTabs'
import { redirectTo } from '@utils/window'
import { NpcKillsLevelMenu } from '@molecules/NpcKillsLevelMenu'
import { Tab } from '@atoms/PageTabs/PageTabs.types'
import { HiscoresTabs } from '@models/HiscoresTabs'
import { NpcHiscoreDataRow } from '@globalTypes/Database/NpcHiscoreDataRow'
import { GetServerSideProps } from 'next'
import { getWebsiteBaseUrl } from '@utils/envUtils'
import { DEFAULT_NPC_ID } from '../../consts/hiscores'
import clsx from 'clsx'

type NpcHiscoresPageProps = {
  hiscores: NpcHiscoreDataRow[]
  npcHiscoreType: NpcHiscoreType
  npcSubTypes: (number | number[])[]
}

const NpcHiscores = ({ hiscores, npcHiscoreType, npcSubTypes }: NpcHiscoresPageProps) => {
  const router = useRouter()
  const [hiscoresPage, setHiscoresPage] = useState(1)
  const npcName = getNpcNameById(npcHiscoreType)
  const pageTitle = `${npcName} Kill Hiscores`

  const handleMenuItemClick = (npcHiscoreType: NpcHiscoreType) => {
    setHiscoresPage(1)
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
      {renderHead(pageTitle, `Who's killed the most ${npcName}s?`)}
      <div className='mx-auto max-w-225 text-center'>
        <PageTabs tabs={HiscoresTabs} activeTab={HiscoresTabs[1]} setActiveTab={tab => handleSetActiveTab(tab)} />
        <div
          className={clsx(
            'flex flex-wrap justify-between gap-4',
            'md:mt-4 md:grid md:grid-cols-[160px_1fr_200px]',
            'lg:flex-nowrap',
          )}
        >
          <NpcHiscoresMenu activeNpcHiscoreType={npcHiscoreType} buttonOnClick={handleMenuItemClick} />
          <div className='w-full'>
            <h2
              className={clsx(
                'text-text-primary mb-4 text-left text-[22px] leading-7 font-bold md:mb-3 md:text-[28px] md:leading-9',
              )}
            >
              {pageTitle}
            </h2>
            <NpcKillsLevelMenu
              npcHiscoreType={npcHiscoreType}
              npcSubTypes={npcSubTypes.length > 0 ? npcSubTypes : [npcHiscoreType]}
              menuItemOnClick={handleMenuItemClick}
            />
            <NpcHiscoresTable
              hiscores={hiscores}
              npcHiscoreType={npcHiscoreType}
              page={hiscoresPage}
              setPage={setHiscoresPage}
            />
          </div>
          <PlayerLookup isNpcHiscores />
        </div>
      </div>
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
