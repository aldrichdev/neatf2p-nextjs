import Typography from '@mui/material/Typography'
import { ContentBlock } from '@atoms/ContentBlock'
import { Introduction } from '@styled/Homepage/Homepage.styled'
import { OnlinePlayers } from '@atoms/OnlinePlayers'
import { NewsAndUpdates } from '@atoms/NewsAndUpdates'
import Link from 'next/link'

const Homepage = () => (
  <div>
    <OnlinePlayers />
    <ContentBlock>
      <Typography variant="h2">Welcome back to 2003.</Typography>
      <Introduction variant="body">
        Neat F2P is a RuneScape Classic private server community that aims to provide you with 
        an RS1 F2P experience, featuring a F2P-only world and economy to explore and enjoy.
        For more information, check out the <Link href="/about" target="_blank">About page</Link>.
      </Introduction>
    </ContentBlock>
    <NewsAndUpdates />
  </div>
)

export default Homepage
