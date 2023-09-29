import { ContentBlock } from '@atoms/ContentBlock'
import { CircularProgress } from '@mui/material'

const Spinner = () => (
  <ContentBlock>
    <CircularProgress color='success' />
  </ContentBlock>
)

export default Spinner
