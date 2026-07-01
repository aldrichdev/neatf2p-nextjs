import { AgendaView } from '@molecules/AgendaView'
import { sendApiRequest } from '@utils/api/apiUtils'
import { useEffect, useState } from 'react'
import { DatabaseEvent, Event } from '@globalTypes/event'
import { getEmojiByName } from '@utils/string/stringUtils'
import { getDateFromMillis } from '@utils/date/date'

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
            id: dbEvent.id,
            title: dbEvent.emojiName ? `${getEmojiByName(dbEvent.emojiName)} ${dbEvent.title}` : dbEvent.title,
            start: getDateFromMillis(dbEvent.startDate),
            end: getDateFromMillis(dbEvent.endDate),
            resource: dbEvent.relativeUrl,
            location: dbEvent.location,
            recurring: dbEvent.recurring === 1 ? true : false,
            recursEvery: dbEvent.recursEvery,
          }))

          setEvents(mappedEvents)
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
