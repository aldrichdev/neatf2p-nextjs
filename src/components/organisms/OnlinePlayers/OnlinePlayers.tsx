import { useEffect, useState } from 'react'
import { PlayersOnlineBox, PlayersOnlineMessage, OnlineCount } from './OnlinePlayers.styled'
import { Spinner } from '@molecules/Spinner'
import { sendApiRequest } from '@helpers/api/apiUtils'

const OnlinePlayers = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [playerCount, setPlayerCount] = useState<number | undefined>(undefined)
  const verb = playerCount === 1 ? 'is' : 'are'

  useEffect(() => {
    const fetchOnlinePlayerCount = () => {
      sendApiRequest('GET', '/api/getOnlinePlayerCount')
        .then(response => {
          setPlayerCount(response.data)
          setIsLoading(false)
        })
        .catch((error: string) => error)
    }

    if (playerCount === undefined) {
      fetchOnlinePlayerCount()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return <Spinner />
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
