import { ContentBlock } from '@atoms/ContentBlock'
import { useEffect, useState } from 'react'
import { HiscoresColumnTwo, HiscoresPageContainer, HiscoresPageHeading } from '@styledPages/hiscores.styled'
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
      <ContentBlock customWidth={900}>
        <PageTabs tabs={HiscoresTabs} activeTab={HiscoresTabs[0]} setActiveTab={tab => handleSetActiveTab(tab)} />
        <HiscoresPageContainer>
          <HiscoresMenu hiscoreType={hiscoreType} buttonOnClick={handleMenuItemClick} />
          <HiscoresColumnTwo>
            <HiscoresPageHeading variant='h2' sx={{ marginBottom: 2 }}>{`${hiscoreType} Hiscores`}</HiscoresPageHeading>
            <HiscoresTable
              hiscores={hiscores}
              isLoading={isLoading}
              hiscoreType={hiscoreType}
              page={hiscoresPage}
              setPage={setHiscoresPage}
            />
          </HiscoresColumnTwo>

          <PlayerLookup />
        </HiscoresPageContainer>
      </ContentBlock>
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
