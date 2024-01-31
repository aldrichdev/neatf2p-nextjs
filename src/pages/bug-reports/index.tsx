import { BodyText } from '@atoms/BodyText'
import { ContentBlock } from '@atoms/ContentBlock'
import { DiscordLink } from '@atoms/DiscordLink'
import { PageHeading } from '@atoms/PageHeading'
import Link from 'next/link'

const BugReports = () => (
  <ContentBlock>
    <PageHeading>Coming Soon</PageHeading>
    <BodyText variant='body'>
      For now, you can submit bugs via{' '}
      <Link href='https://github.com/aldrichdev/Neat-F2P/issues' target='_blank'>
        GitHub
      </Link>{' '}
      or in the #bug-reports channel of our <DiscordLink />.
    </BodyText>
  </ContentBlock>
)

export default BugReports
