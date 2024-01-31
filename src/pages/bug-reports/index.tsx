import { BodyText } from '@atoms/BodyText'
import { ContentBlock } from '@atoms/ContentBlock'
import { DiscordLink } from '@atoms/DiscordLink'
import { Typography } from '@mui/material'
import Link from 'next/link'

const BugReports = () => (
  <ContentBlock topMargin={20}>
    <Typography variant='h2'>Coming Soon</Typography>
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
