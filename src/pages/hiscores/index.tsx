import { ContentBlock } from '@atoms/ContentBlock'
import { Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { BodyText } from '@atoms/BodyText'
import { HiscoresPageContainer } from '@styledPages/hiscores.styled'
import { Spinner } from '@molecules/Spinner'
import { HiscoresTable } from '@atoms/HiscoresTable'
import { HiscoresMenu } from '@atoms/HiscoresMenu'
import useHiscores from '@hooks/useHiscores'
import { HiscoreTypes, HiscoreType } from '@globalTypes/Hiscores/HiscoreType'
import { useRouter } from 'next/router'

const Hiscores = () => {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { query } = router
  const isHiscoreType = (x: any): x is HiscoreType => HiscoreTypes.includes(x)
  const [hiscoreType, setHiscoreType] = useState<HiscoreType>('Overall')
  const hiscores = useHiscores(hiscoreType)

  useEffect(() => {
    if (hiscores) setIsLoading(false)
  }, [hiscores])

  useEffect(() => {
    setHiscoreType(isHiscoreType(query?.skill) ? query?.skill : 'Overall')
  }, [query])

  if (isLoading || !hiscores) {
    return <Spinner />
  }

  return (
    <ContentBlock topMargin={20}>
      <Typography variant='h2'>{hiscoreType} Hiscores</Typography>
      <BodyText variant='body' textAlign='center'>
        Below are the current <strong>alpha</strong> {hiscoreType} hiscores.
      </BodyText>
      <HiscoresPageContainer>
        <HiscoresMenu hiscoreType={hiscoreType} buttonOnClick={setHiscoreType} />
        <HiscoresTable hiscores={hiscores} hiscoreType={hiscoreType} />
      </HiscoresPageContainer>
    </ContentBlock>
  )
}

export default Hiscores
