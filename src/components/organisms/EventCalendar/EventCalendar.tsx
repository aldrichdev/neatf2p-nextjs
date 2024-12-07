import { EventCalendarContainer, DesktopEventCalendar, DesktopEventView } from './EventCalendar.styled'
import { Event as RbcEvent, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { MobileAgendaView } from '@molecules/MobileAgendaView'
import { BodyText } from '@atoms/BodyText'
import { PageHeading } from '@atoms/PageHeading'
import { sendApiRequest } from '@helpers/api/apiUtils'
import { useEffect, useState } from 'react'
import { Event } from './EventCalendar.types'
import { Spinner } from '@molecules/Spinner'

const localizer = momentLocalizer(moment)

const EventCalendar = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [events, setEvents] = useState<Event[]>()
  const [fetchError, setFetchError] = useState<string>('')

  const handleEventOpen = (e: RbcEvent) => {
    // Open related news post in new tab
    window.open(e.resource)
  }

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

  return (
    <EventCalendarContainer>
      <DesktopEventView>
        <PageHeading>Event Calendar</PageHeading>
        <BodyText variant='body' bodyTextAlign='center' topMargin={0}>
          Double-click an event to see more information about it.
        </BodyText>
        <DesktopEventCalendar
          localizer={localizer}
          events={events}
          style={{ height: 600 }}
          onDoubleClickEvent={e => handleEventOpen(e)}
          views={['month', 'week', 'day']}
        />
      </DesktopEventView>
      {events && <MobileAgendaView events={events} />}
    </EventCalendarContainer>
  )
}

export default EventCalendar
