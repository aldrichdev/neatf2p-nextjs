import { useEffect, useState } from 'react'
import { sendApiRequest } from '@utils/api/apiUtils'

const OnlinePlayers = () => {
  const [playerCount, setPlayerCount] = useState<number | undefined>(undefined)
  const verb = playerCount === 1 ? 'is' : 'are'

  useEffect(() => {
    const fetchOnlinePlayerCount = () => {
      sendApiRequest('GET', '/api/getOnlinePlayerCount')
        .then(response => {
          setPlayerCount(response.data)
        })
        .catch((error: string) => error)
    }

    if (playerCount === undefined) {
      fetchOnlinePlayerCount()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!playerCount) return null

  return (
    <div className='flex justify-center animate-[fadeUp_0.5s_ease-out_forwards] transition-colors'>
      <p className='text-md text-center font-mono mt-5 md:m-0'>
        There {verb} currently <span className='font-semibold text-primary-main'>{playerCount}</span> player
        {playerCount > 1 ? 's' : ''} online.
      </p>
    </div>
  )
}

export default OnlinePlayers
