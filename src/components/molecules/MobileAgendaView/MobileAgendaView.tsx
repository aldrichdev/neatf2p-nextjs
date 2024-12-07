import { MobileAgendaViewProps } from './MobileAgendaView.types'
import {
  MobileAgendaViewBody,
  MobileAgendaViewContainer,
  MobileEventCard,
  MobileEventCardBody,
  MobileEventCardBodyLine,
  MobileEventCardTitle,
} from './MobileAgendaView.styled'
import { getPrettyDateString } from '@helpers/date/date'
import { BodyText } from '@atoms/BodyText'
import Link from 'next/link'
import { PageHeading } from '@atoms/PageHeading'

const MobileAgendaView = (props: MobileAgendaViewProps) => {
  const { events } = props
  const now = new Date()
  const twoMonthsFromNow = new Date()
  twoMonthsFromNow.setMonth(now.getMonth() + 2)

  const sortedAndFilteredEvents = events
    .filter(event => new Date(event.start) < twoMonthsFromNow && new Date(event.end) > now)
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())

  return (
    <MobileAgendaViewContainer>
      <PageHeading>Upcoming Events</PageHeading>
      <BodyText variant='body' topMargin={0}>
        All event times are shown in your local time zone.
      </BodyText>
      <MobileAgendaViewBody>
        {sortedAndFilteredEvents?.length > 0 ? (
          sortedAndFilteredEvents.map(event => (
            <MobileEventCard key={event.id}>
              <MobileEventCardTitle>{event.title}</MobileEventCardTitle>
              <MobileEventCardBody>
                {event.location && (
                  <MobileEventCardBodyLine>
                    <strong>Where:</strong> {event.location}
                  </MobileEventCardBodyLine>
                )}
                <MobileEventCardBodyLine>
                  <strong>Starts:</strong> {getPrettyDateString(new Date(event.start))}
                </MobileEventCardBodyLine>
                <MobileEventCardBodyLine>
                  <strong>Ends:</strong> {getPrettyDateString(new Date(event.end))}
                </MobileEventCardBodyLine>
                {event.resource && (
                  <MobileEventCardBodyLine>
                    <Link href={event.resource} target='_blank'>
                      More info
                    </Link>
                  </MobileEventCardBodyLine>
                )}
              </MobileEventCardBody>
            </MobileEventCard>
          ))
        ) : (
          <BodyText variant='body'>No Upcoming Events</BodyText>
        )}
      </MobileAgendaViewBody>
    </MobileAgendaViewContainer>
  )
}

export default MobileAgendaView
