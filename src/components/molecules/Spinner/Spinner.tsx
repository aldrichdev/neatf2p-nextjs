import { ContentBlock } from '@atoms/ContentBlock'
import { CircularProgress } from '@mui/material'
import { css, styled } from '@mui/material/styles'

type SpinnerProps = {
  hiscores?: boolean
}

const HiscoresLoading = styled('div')(
  () => css`
    display: flex;
    align-items: flex-start;
    margin: 0 auto;
    min-height: 1000px;
  `,
)

const Spinner = (props: SpinnerProps) => {
  const { hiscores } = props

  return hiscores ? (
    <HiscoresLoading>
      <CircularProgress color='success' />
    </HiscoresLoading>
  ) : (
    <ContentBlock>
      <CircularProgress color='success' />
    </ContentBlock>
  )
}

export default Spinner
