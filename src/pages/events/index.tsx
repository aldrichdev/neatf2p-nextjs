import { ContentBlock } from '@atoms/ContentBlock'
import { EventCalendar } from '@organisms/EventCalendar'

const EventsPage = () => {
  return (
    <ContentBlock isWide>
      <EventCalendar />
    </ContentBlock>
  )
}

export default EventsPage
