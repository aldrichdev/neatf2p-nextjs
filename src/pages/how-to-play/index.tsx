import { Typography } from '@mui/material'
import Link from 'next/link'
import { ContentBlock } from '@atoms/ContentBlock'

const HowToPlay = () => (
  <ContentBlock topMargin={20}>
    <Typography variant="body">
      Neat F2P is not yet available to play.
      Please keep checking our <Link href="https://discord.gg/wd67zUxPXn" target="_blank">Discord</Link> and
      the homepage for further updates on when the game will be ready to play.
    </Typography>
  </ContentBlock>

)

export default HowToPlay
