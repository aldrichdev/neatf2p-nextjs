import { Typography } from '@mui/material'
import { ContentBlock } from '@atoms/ContentBlock'
import { BodyText } from '@atoms/BodyText'
import { DiscordLink } from '@atoms/DiscordLink'

const HowToPlay = () => (
  <ContentBlock topMargin={20}>
    <Typography variant='h2'>Coming Soon</Typography>
    <BodyText variant='body'>
      Neat F2P has not yet launched. Please keep checking our <DiscordLink /> for more info on when it will be ready to
      play.
    </BodyText>
  </ContentBlock>
)

export default HowToPlay
