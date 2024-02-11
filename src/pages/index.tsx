import { ContentBlock } from '@atoms/ContentBlock'
import { DiscordButtonContainer, DiscordIcon, YouTubeVideo, YouTubeVideoContainer } from '@styledPages/Homepage.styled'
import { OnlinePlayers } from '@organisms/OnlinePlayers'
import { NewsAndUpdates } from '@organisms/NewsAndUpdates'
import Link from 'next/link'
import DiscordLogo from 'public/img/discord-512.webp'
import { DiscordLink } from '@atoms/DiscordLink'
import { PageHeading } from '@atoms/PageHeading'
import { BodyText } from '@atoms/BodyText'

const Homepage = () => (
  <div>
    <ContentBlock isWide>
      <OnlinePlayers />
    </ContentBlock>
    <ContentBlock isWide topMargin={40}>
      <PageHeading>Welcome back to 2003</PageHeading>
      <BodyText variant='body' textAlign='center'>
        Neat F2P is an <em>upcoming</em> RuneScape Classic private server that aims to provide you with an RS1 F2P
        experience, featuring a F2P-only world and economy to explore and enjoy. For more information, check out the{' '}
        <Link href='/about'>About page</Link>.
      </BodyText>
    </ContentBlock>
    <ContentBlock isWide topMargin={40}>
      <YouTubeVideo
        src='https://www.youtube.com/embed/eOvPDYAxavg?si=e6uvjtidaQ8PXb9V&vq=hd1080&rel=0'
        title='YouTube video player'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        allowFullScreen
      ></YouTubeVideo>
    </ContentBlock>
    <ContentBlock isWide topMargin={40}>
      <NewsAndUpdates heading='Latest News & Updates' limit={3} showViewAllButton />
    </ContentBlock>
    <ContentBlock isWide topMargin={40}>
      <PageHeading>Join the Community</PageHeading>
      <BodyText variant='body' textAlign='center'>
        Click the button below to join our Discord server.
      </BodyText>
      <DiscordButtonContainer>
        <DiscordLink>
          <DiscordIcon src={DiscordLogo.src} alt='Join our Discord Server' />
        </DiscordLink>
      </DiscordButtonContainer>
    </ContentBlock>
  </div>
)

export default Homepage
