import { ContentBlock } from '@atoms/ContentBlock'
import { Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { BodyText } from '@atoms/BodyText'
import { HiscoresPageContainer } from '@styledPages/hiscores.styled'
import { HiscoresMenu } from '@atoms/HiscoresMenu'
import { HiscoresTable } from '@atoms/HiscoresTable'
import { Spinner } from '@molecules/Spinner'
import useHiscores from '@hooks/useHiscores'
import { HiscoreType } from '@globalTypes/Hiscores/HiscoreType'

const Hiscores = () => {
  const [isLoading, setIsLoading] = useState(true)
  const hiscoreType: HiscoreType = 'Attack'
  const hiscores = useHiscores(hiscoreType)

  useEffect(() => {
    if (hiscores) setIsLoading(false)
  }, [hiscores])

  if (isLoading || !hiscores) {
    return <Spinner />
  }

  return (
    <ContentBlock topMargin={20} isWide>
      <Typography variant='h2'>{hiscoreType} Hiscores</Typography>
      <BodyText variant='body' textAlign='center'>
        Below are the current <strong>alpha</strong> {hiscoreType} hiscores. This is a very rough, early verison of the
        hiscores pages - don&apos;t worry, it will look better soon!
      </BodyText>
      <HiscoresPageContainer>
        <HiscoresMenu hiscoreType={hiscoreType} />
        <HiscoresTable hiscores={hiscores} hiscoreType={hiscoreType} />
      </HiscoresPageContainer>
    </ContentBlock>
  )
}

export default Hiscores
