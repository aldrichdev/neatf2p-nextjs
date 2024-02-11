import { ContentBlock } from '@atoms/ContentBlock'
import { BodyText } from '@atoms/BodyText'
import { DiscordLink } from '@atoms/DiscordLink'
import { PageHeading } from '@atoms/PageHeading'

const HowToPlay = () => (
  <ContentBlock>
    <PageHeading>Coming Soon</PageHeading>
    <BodyText variant='body' textAlign='center'>
      Neat F2P has not yet launched. Please keep checking our <DiscordLink /> for more info on when it will be ready to
      play.
    </BodyText>
  </ContentBlock>
)

export default HowToPlay
