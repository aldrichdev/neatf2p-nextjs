import { AgendaView } from '@molecules/AgendaView'
import { sendApiRequest } from '@utils/api/apiUtils'
import { useEffect, useState } from 'react'
import { Event } from './EventCalendar.types'

const EventCalendar = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [events, setEvents] = useState<Event[]>()
  const [fetchError, setFetchError] = useState<string>('')

  useEffect(() => {
    const fetchEvents = () => {
      sendApiRequest('GET', '/api/getEvents')
        .then(response => {
          setEvents(response?.data)
          setIsLoading(false)
        })
        .catch((error: string) => {
          const errorMsg = `Error getting events: ${error}`
          setFetchError(errorMsg)
          console.error(errorMsg)
        })
    }

    if (events === undefined && !fetchError) {
      fetchEvents()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='flex w-full flex-wrap items-center justify-center gap-5 md:gap-10'>
      <AgendaView events={events || []} isLoading={isLoading} />
    </div>
  )
}

export default EventCalendar
