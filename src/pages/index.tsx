import axios from 'axios';
import { useState } from 'react'
import Typography from '@mui/material/Typography'
import { PlayersOnlineBox, PlayersOnlineMessage, BoldCount, Headline, Introduction } from './index.styled'

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

  return (
    <div>
      <PlayersOnlineBox>
        <PlayersOnlineMessage>
          There {verb} currently <BoldCount>{playerCount}</BoldCount> player(s) online.
        </PlayersOnlineMessage>
      </PlayersOnlineBox>

      <div>
        <Headline variant="h2">Welcome back to 2003.</Headline>
        <Introduction variant="body">
          Our mission is to provide you with a F2P-only world and economy to explore and enjoy. 
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
          laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in 
          voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat 
          non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Introduction>
      </div>
    </div>

  )
}

export default Homepage