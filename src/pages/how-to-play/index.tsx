import { Typography } from '@mui/material'
import Link from 'next/link'
import { ContentBlock } from '@atoms/ContentBlock'

const HowToPlay = () => (
  <ContentBlock topMargin={20}>
    <Typography variant='body'>
      Neat F2P has not yet officially launched. However, we are currently in an alpha testing phase (until January
      28th). If you would like to try out the alpha, please join our{' '}
      <Link href='https://discord.gg/wd67zUxPXn' target='_blank'>
        Discord
      </Link>{' '}
      and check the <strong>#alpha-testing-channel</strong> for connection info!
    </Typography>
  </ContentBlock>
)

export default HowToPlay
