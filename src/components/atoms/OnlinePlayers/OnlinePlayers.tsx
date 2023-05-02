import axios from 'axios';
import { useState } from 'react'
import { PlayersOnlineBox, PlayersOnlineMessage, OnlineCount } from './OnlinePlayers.styled'

const OnlinePlayers = () => {
  const [playerCount, setPlayerCount] = useState<number|undefined>(undefined)
  const verb = playerCount === 1 ? 'is' : 'are'

  const fetchOnlinePlayerCount = () => {
    console.log('fetchOnlinePlayerCount should only be called once', playerCount)
    axios.get('/api/getOnlinePlayerCount')
      .then((response) => {
        setPlayerCount(response.data)
      })
      .catch((error : string) => error)
  }

  if (playerCount === undefined) {
    fetchOnlinePlayerCount()
  }

  if (playerCount != 0 && !playerCount) return null

  return (
    <PlayersOnlineBox>
      <PlayersOnlineMessage>
        There {verb} currently <OnlineCount>{playerCount}</OnlineCount> player(s) online.
      </PlayersOnlineMessage>
    </PlayersOnlineBox>
  )
}

export default OnlinePlayers
