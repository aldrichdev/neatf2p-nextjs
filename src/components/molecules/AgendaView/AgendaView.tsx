import { AgendaViewProps } from './AgendaView.types'
import { AgendaViewBody, EventCard, EventCardBody, EventCardBodyLine, EventCardTitle } from './AgendaView.styled'
import { getPrettyDateString } from '@helpers/date/date'
import { BodyText } from '@atoms/BodyText'
import Link from 'next/link'
import { PageHeading } from '@atoms/PageHeading'

/** An agenda view showing events that are happening in the next 6 months, in addition to recurring events, in boxes. */
const AgendaView = (props: AgendaViewProps) => {
  const { events } = props
  const now = new Date()
  const sixMonthsFromNow = new Date()
  sixMonthsFromNow.setMonth(now.getMonth() + 6)

  const sortedAndFilteredEvents = events
    .filter(event => event.recurring || (new Date(event.start) < sixMonthsFromNow && new Date(event.end) > now))
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())

  return (
    <>
      <PageHeading>Upcoming Events</PageHeading>
      {sortedAndFilteredEvents?.length > 0 && (
        <BodyText variant='body' topMargin={0}>
          Below is a list of events that will be happening on the Neat F2P server within the next 6 months. All event
          times are shown in your local time zone.
        </BodyText>
      )}
      <AgendaViewBody>
        {sortedAndFilteredEvents?.length > 0 ? (
          sortedAndFilteredEvents.map(event => (
            <EventCard key={event.id}>
              <EventCardTitle>{event.title}</EventCardTitle>
              <EventCardBody>
                {event.location && (
                  <EventCardBodyLine>
                    <strong>Where:</strong> {event.location}
                  </EventCardBodyLine>
                )}
                {event.recurring ? (
                  <EventCardBodyLine>
                    <strong>When:</strong> <u>Every {event.recursEvery}</u> at{' '}
                    {new Date(event.start).toLocaleTimeString('en-US')}
                  </EventCardBodyLine>
                ) : (
                  <>
                    <EventCardBodyLine>
                      <strong>Starts:</strong> {getPrettyDateString(new Date(event.start))}
                    </EventCardBodyLine>
                    <EventCardBodyLine>
                      <strong>Ends:</strong> {getPrettyDateString(new Date(event.end))}
                    </EventCardBodyLine>
                  </>
                )}
                {event.resource && (
                  <EventCardBodyLine>
                    <Link href={event.resource} target='_blank'>
                      More info
                    </Link>
                  </EventCardBodyLine>
                )}
              </EventCardBody>
            </EventCard>
          ))
        ) : (
          <BodyText variant='body'>No Upcoming Events</BodyText>
        )}
      </AgendaViewBody>
    </>
  )
}

export default AgendaView
