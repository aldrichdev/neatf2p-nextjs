import axios from 'axios';
import { useState } from 'react'
import Typography from '@mui/material/Typography'
import { ContentBlock } from '@atoms/ContentBlock'
import { PlayersOnlineBox, PlayersOnlineMessage, OnlineCount, Introduction } from './index.styled'
import { NewsAndUpdates } from '@atoms/NewsAndUpdates'

const Homepage = () => {
  const [playerCount, setPlayerCount] = useState(0)

  const fetchOnlinePlayerCount = () => {
    axios.get('/api/getOnlinePlayerCount')
      .then((response) => {
        setPlayerCount(response.data)
      })
      .catch((error : string) => error)
  }

  fetchOnlinePlayerCount()

  const verb = playerCount === 1 ? 'is' : 'are'

  const newsPosts = [] // TODO: get from database
  
  return (
    <div>
      <PlayersOnlineBox>
        <PlayersOnlineMessage>
          There {verb} currently <OnlineCount>{playerCount}</OnlineCount> player(s) online.
        </PlayersOnlineMessage>
      </PlayersOnlineBox>
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
      <NewsAndUpdates newsPosts={newsPosts} />
    </div>
  )
}

export default Homepage