import Typography from '@mui/material/Typography'
import { ContentBlock } from '@atoms/ContentBlock'
import { SectionBody, DiscordIcon } from '@styled/Homepage/Homepage.styled'
import { OnlinePlayers } from '@atoms/OnlinePlayers'
import { NewsAndUpdates } from '@organisms/NewsAndUpdates'
import Link from 'next/link'
import DiscordLogo from 'public/img/discord-512.webp'

const Homepage = () => (
  <div>
    <OnlinePlayers />
    <ContentBlock isHomepage>
      <Typography variant="h2">Welcome back to 2003</Typography>
      <SectionBody variant="body">
        Neat F2P is an <em>upcoming</em> RuneScape Classic private server that aims to provide you with 
        an RS1 F2P experience, featuring a F2P-only world and economy to explore and enjoy.
        For more information, check out the <Link href="/about">About page</Link>.
      </SectionBody>
    </ContentBlock>
    <NewsAndUpdates heading='Latest News & Updates' limit={3} showViewAllButton />
    <ContentBlock isHomepage>
      <Typography variant="h2">Join the Community</Typography>
      <SectionBody variant="body">
        Click the button below to join our Discord server.
      </SectionBody>
      <Link href="https://discord.gg/wd67zUxPXn" target="_blank">
        <DiscordIcon src={DiscordLogo.src} alt='Join our Discord Server' />
      </Link>
    </ContentBlock>

  </div>
)

export default Homepage
