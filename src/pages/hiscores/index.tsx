import { useEffect, useState } from 'react'
import { HiscoresTable } from '@molecules/HiscoresTable'
import { HiscoresMenu } from '@molecules/HiscoresMenu'
import useHiscores from '@hooks/useHiscores'
import { HiscoreTypes, HiscoreType } from '@globalTypes/Hiscores/HiscoreType'
import { useRouter } from 'next/router'
import { PlayerLookup } from '@atoms/PlayerLookup'
import { push } from '@utils/router'
import { renderHead } from '@utils/renderUtils'
import { PageTabs } from '@atoms/PageTabs'
import { redirectTo } from '@utils/window'
import { Tab } from '@atoms/PageTabs/PageTabs.types'
import { HiscoresTabs } from '@models/HiscoresTabs'
import { GetServerSideProps } from 'next'
import clsx from 'clsx'

type HiscoresProps = {
  skill: HiscoreType
}

const Hiscores = ({ skill }: HiscoresProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const [hiscoresPage, setHiscoresPage] = useState(1)
  const isHiscoreType = (x: string): x is HiscoreType => HiscoreTypes.includes(x as HiscoreType)
  const [hiscoreType, setHiscoreType] = useState<HiscoreType>('Overall')
  const hiscores = useHiscores(hiscoreType, setIsLoading)

  const handleMenuItemClick = (hiscoreType: HiscoreType) => {
    setHiscoreType(hiscoreType)
    setHiscoresPage(1)
    router.query.skill = hiscoreType
    push(router, '/hiscores', router.query)
  }

  const handleSetActiveTab = (tab: Tab) => {
    if (tab.label === 'NPC Kills') {
      redirectTo('/npc-hiscores')
    }
  }

  useEffect(() => {
    if (skill) {
      setHiscoreType(typeof skill === 'string' && isHiscoreType(skill) ? skill : 'Overall')
    } else {
      setHiscoreType('Overall')
    }
  }, [skill])

  return (
    <>
      {renderHead(`${skill} Hiscores`, `The latest player rankings in the ${skill} skill.`)}
      <div className='mx-auto max-w-225 text-center'>
        <PageTabs tabs={HiscoresTabs} activeTab={HiscoresTabs[0]} setActiveTab={tab => handleSetActiveTab(tab)} />
        <div
          className={clsx(
            'flex flex-wrap justify-between gap-4 md:mt-4 md:grid md:grid-cols-[20%_55%_20%]',
            'lg:h-250 lg:grid-cols-[160px_1fr_200px] lg:flex-nowrap',
          )}
        >
          <HiscoresMenu hiscoreType={hiscoreType} buttonOnClick={handleMenuItemClick} />
          <div className='w-full'>
            <h2
              className={clsx(
                'text-text-primary mb-4 text-left text-[22px] leading-7 font-bold',
                'md:mb-3 md:text-[28px] md:leading-9',
              )}
            >
              {`${hiscoreType} Hiscores`}
            </h2>
            <HiscoresTable
              hiscores={hiscores}
              isLoading={isLoading}
              hiscoreType={hiscoreType}
              page={hiscoresPage}
              setPage={setHiscoresPage}
            />
          </div>
          <PlayerLookup />
        </div>
      </div>
    </>
  )
}

export default Hiscores

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const skill = query.skill

  return {
    // Send the skill from the query string to the Hiscores page so it can be used in the browser title
    props: {
      skill: skill || 'Overall',
    },
  }
}
