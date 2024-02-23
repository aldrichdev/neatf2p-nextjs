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
import { push } from '@helpers/router'

const Hiscores = () => {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { query } = router
  const [hiscoresPage, setHiscoresPage] = useState(1)
  const isHiscoreType = (x: string): x is HiscoreType => HiscoreTypes.includes(x as HiscoreType)
  const [hiscoreType, setHiscoreType] = useState<HiscoreType>('Overall')
  const hiscores = useHiscores(hiscoreType, setIsLoading)

  const handleMenuItemClick = (hiscoreType: HiscoreType) => {
    setHiscoreType(hiscoreType)
    setHiscoresPage(1)
    router.query.page = '1'
    router.query.skill = hiscoreType
    push(router, '/hiscores', router.query)
  }

  useEffect(() => {
    if (query.skill) {
      setHiscoreType(typeof query.skill === 'string' && isHiscoreType(query.skill) ? query.skill : 'Overall')
    } else {
      setHiscoreType('Overall')
    }
  }, [query])

  return (
    <ContentBlock isWide>
      <PageHeading>{`${hiscoreType} Hiscores`}</PageHeading>
      <HiscoresPageContainer>
        <HiscoresMenu hiscoreType={hiscoreType} buttonOnClick={handleMenuItemClick} />
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
  )
}

export default Hiscores
