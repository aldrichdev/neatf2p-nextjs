import { ContentBlock } from '@atoms/ContentBlock'
import { useEffect, useState } from 'react'
import { HiscoresPageContainer } from '@styledPages/hiscores.styled'
import { HiscoresTable } from '@atoms/HiscoresTable'
import { HiscoresMenu } from '@atoms/HiscoresMenu'
import useHiscores from '@hooks/useHiscores'
import { HiscoreTypes, HiscoreType } from '@globalTypes/Hiscores/HiscoreType'
import { useRouter } from 'next/router'
import { Spinner } from '@molecules/Spinner'
import { PlayerLookup } from '@molecules/PlayerLookup'
import { PageHeading } from '@atoms/PageHeading'
import { TextBanner } from '@atoms/TextBanner'

const Hiscores = () => {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { query } = router
  const isHiscoreType = (x: any): x is HiscoreType => HiscoreTypes.includes(x)
  const [hiscoreType, setHiscoreType] = useState<HiscoreType>('Overall')
  const hiscores = useHiscores(hiscoreType, setIsLoading)

  useEffect(() => {
    setHiscoreType(isHiscoreType(query?.skill) ? query?.skill : 'Overall')
  }, [query])

  return (
    <ContentBlock isWide>
      <PageHeading>{`${hiscoreType} Hiscores`}</PageHeading>
      <TextBanner>
        <span>
          Hiscores currently show <strong>alpha tester</strong> accounts. These are temporary and will not be accessible
          in the full game.
        </span>
      </TextBanner>
      <HiscoresPageContainer>
        <HiscoresMenu hiscoreType={hiscoreType} buttonOnClick={setHiscoreType} />
        {isLoading || !hiscores ? (
          <Spinner hiscores />
        ) : (
          <HiscoresTable hiscores={hiscores} hiscoreType={hiscoreType} />
        )}
        <PlayerLookup />
      </HiscoresPageContainer>
    </ContentBlock>
  )
}

export default Hiscores
