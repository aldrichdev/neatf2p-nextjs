import { ContentBlock } from '@atoms/ContentBlock'
import { DiscordIcon } from '@styledPages/Homepage.styled'
import { OnlinePlayers } from '@organisms/OnlinePlayers'
import { NewsAndUpdates } from '@organisms/NewsAndUpdates'
import Link from 'next/link'
import DiscordLogo from 'public/img/discord-512.webp'
import { DiscordLink } from '@atoms/DiscordLink'
import { PageHeading } from '@atoms/PageHeading'
import { BodyText } from '@atoms/BodyText'
import { Banner, TabletAndDesktopBanner } from '@atoms/TabletAndDesktopBanner/TabletAndDesktopBanner'

const Homepage = () => (
  <div>
    <ContentBlock isWide>
      <OnlinePlayers />
    </ContentBlock>
    <ContentBlock isWide topMargin={40}>
      <PageHeading>Welcome back to 2003</PageHeading>
      <BodyText variant='body' bodyTextAlign='center'>
        Neat F2P is a RuneScape Classic private server that aims to provide you with an RS1 F2P experience, featuring a
        F2P-only world and economy to explore and enjoy. For more information, check out the{' '}
        <Link href='/about'>About page</Link>.
      </BodyText>
    </ContentBlock>
    <ContentBlock isWide topMargin={40}>
      <TabletAndDesktopBanner src='/img/banners/HomepageBanner.png' alt='Relive It All' />
    </ContentBlock>
    <ContentBlock isWide topMargin={40}>
      <NewsAndUpdates heading='Latest News & Updates' limit={3} showViewAllButton />
    </ContentBlock>
    <ContentBlock isWide topMargin={40}>
      <PageHeading>Join the Community</PageHeading>
      <BodyText variant='body' bodyTextAlign='center'>
        Click the button below to join our Discord server.
      </BodyText>
    </ContentBlock>
    <ContentBlock isWide topMargin={40}>
      <DiscordLink>
        <DiscordIcon src={DiscordLogo.src} alt='Join our Discord Server' />
      </DiscordLink>
    </ContentBlock>
  </div>
)

export default Homepage
