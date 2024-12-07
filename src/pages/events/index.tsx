import { ContentBlock } from '@atoms/ContentBlock'
import { EventCalendar } from '@organisms/EventCalendar'

/** TODO: Tear down once events are fully finished */
const EventsPage = () => {
  return (
    <ContentBlock isWide>
      <EventCalendar />
    </ContentBlock>
  )
}

export default EventsPage
