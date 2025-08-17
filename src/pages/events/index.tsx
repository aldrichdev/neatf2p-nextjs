import { ContentBlock } from '@atoms/ContentBlock'
import { EventCalendar } from '@organisms/EventCalendar'
import { renderHead } from '@helpers/renderUtils'

const EventsPage = () => {
  return (
    <>
      {renderHead('Event Calendar')}
      <ContentBlock isWide>
        <EventCalendar />
      </ContentBlock>
    </>
  )
}

export default EventsPage
