import Typography from '@mui/material/Typography'
import { ContentBlock } from '@atoms/ContentBlock'
import { Introduction } from './index.styled'
import { OnlinePlayers } from '@atoms/OnlinePlayers'
import { NewsAndUpdates } from '@atoms/NewsAndUpdates'

const Homepage = () => (
  <div>
    <OnlinePlayers />
    <ContentBlock>
      <Typography variant="h2">Welcome back to 2003.</Typography>
      <Introduction variant="body">
        Our mission is to provide you with a F2P-only world and economy to explore and enjoy. 
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat 
        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </Introduction>
    </ContentBlock>
    <NewsAndUpdates />
  </div>
)

export default Homepage
