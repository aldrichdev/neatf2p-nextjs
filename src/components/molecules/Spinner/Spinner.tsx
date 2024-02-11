import { ContentBlock } from '@atoms/ContentBlock'
import { CircularProgress } from '@mui/material'
import { css, styled } from '@mui/material/styles'

type SpinnerProps = {
  hiscores?: boolean
}

const HiscoresLoading = styled('div')(
  ({ theme }) => css`
    display: flex;
    flex-basis: 100%;
    align-items: flex-start;
    justify-content: center;
    margin: 0 auto;
    min-height: 1000px;

    ${theme.breakpoints.up('tablet')} {
      flex-basis: auto;
    }
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
