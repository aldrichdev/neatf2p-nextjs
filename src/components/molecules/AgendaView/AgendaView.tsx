import { AgendaViewProps } from './AgendaView.types'
import { getPrettyDateString } from '@utils/date/date'
import { BodyText } from '@atoms/BodyText'
import { PageHeading } from '@atoms/PageHeading'
import { Spinner } from '@molecules/Spinner'
import { StandardLink } from '@atoms/StandardLink'

/** An agenda view showing events that are happening in the next 6 months, in addition to recurring events, in boxes. */
const AgendaView = (props: AgendaViewProps) => {
  const { events, isLoading } = props
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
        <BodyText>
          Below is a list of events that will be happening on the Neat F2P server within the next 6 months. All event
          times are shown in your local time zone.
        </BodyText>
      )}
      {isLoading ? (
        <Spinner className='basis-full' />
      ) : sortedAndFilteredEvents?.length > 0 ? (
        <div className='grid grid-cols-1 gap-5 text-base font-normal md:grid-cols-2 lg:grid-cols-3'>
          {sortedAndFilteredEvents.map(event => (
            <div key={event.id} className='w-full border border-black'>
              <p className='m-0 border-b border-black'>{event.title}</p>
              <div className='p-2 text-left'>
                {event.location && (
                  <p className='my-3'>
                    <strong>Where:</strong> {event.location}
                  </p>
                )}
                {event.recurring ? (
                  <p className='my-3'>
                    <strong>When:</strong> <u>Every {event.recursEvery}</u> at{' '}
                    {new Date(event.start).toLocaleTimeString('en-US')}
                  </p>
                ) : (
                  <>
                    <p className='my-3'>
                      <strong>Starts:</strong> {getPrettyDateString(new Date(event.start))}
                    </p>
                    <p className='my-3'>
                      <strong>Ends:</strong> {getPrettyDateString(new Date(event.end))}
                    </p>
                  </>
                )}
                {event.resource && (
                  <p className='my-3'>
                    <StandardLink href={event.resource} target='_blank'>
                      More info
                    </StandardLink>
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <BodyText className='basis-full' bodyTextAlign='center'>
          No Upcoming Events
        </BodyText>
      )}
    </>
  )
}

export default AgendaView
