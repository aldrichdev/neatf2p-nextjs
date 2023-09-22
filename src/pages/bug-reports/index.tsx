import { ContentBlock } from '@atoms/ContentBlock'
import { Typography } from '@mui/material'
import Link from 'next/link'

const BugReports = () => (
  <>
    <ContentBlock topMargin={20}>
      <Typography variant="body">
        Coming Soon...
      </Typography>
    </ContentBlock>
    <ContentBlock topMargin={0}>
      <Typography variant="body">
        For now, you can submit bugs via <Link 
        href="https://github.com/aldrichdev/Neat-F2P/issues" target="_blank">GitHub</Link>.
      </Typography>
    </ContentBlock>
  </>

)

export default BugReports
