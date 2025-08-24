import { EventCalendarContainer } from './EventCalendar.styled'
import { AgendaView } from '@molecules/AgendaView'
import { sendApiRequest } from '@helpers/api/apiUtils'
import { useEffect, useState } from 'react'
import { Event } from './EventCalendar.types'
import { Spinner } from '@molecules/Spinner'

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
          console.log(errorMsg)
        })
    }

    if (events === undefined && !fetchError) {
      fetchEvents()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  return <EventCalendarContainer>{events && <AgendaView events={events} />}</EventCalendarContainer>
}

export default EventCalendar
