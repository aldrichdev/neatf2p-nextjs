import { EventCalendarContainer } from './EventCalendar.styled'
import { AgendaView } from '@molecules/AgendaView'
import { sendApiRequest } from '@helpers/api/apiUtils'
import { useEffect, useState } from 'react'
import { DatabaseEvent, Event } from '@globalTypes/event'
import { Spinner } from '@molecules/Spinner'
import { getEmojiByName } from '@helpers/string/stringUtils'
import { getDateFromMillis } from '@helpers/date/date'

const EventCalendar = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [events, setEvents] = useState<Event[]>()
  const [fetchError, setFetchError] = useState<string>('')

  useEffect(() => {
    const fetchEvents = () => {
      sendApiRequest('GET', '/api/getEvents')
        .then(response => {
          const databaseEvents: DatabaseEvent[] = response?.data

          const mappedEvents: Event[] = databaseEvents.map(dbEvent => ({
            id: dbEvent.Id,
            title: dbEvent.EmojiName ? `${getEmojiByName(dbEvent.EmojiName)} ${dbEvent.Title}` : dbEvent.Title,
            start: getDateFromMillis(dbEvent.StartDate),
            end: getDateFromMillis(dbEvent.EndDate),
            resource: dbEvent.RelativeUrl,
            location: dbEvent.Location,
            recurring: dbEvent.Recurring === 1 ? true : false,
            recursEvery: dbEvent.RecursEvery,
          }))

          setEvents(mappedEvents)
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
