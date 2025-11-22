import { ContentBlock } from '@atoms/ContentBlock'
import { EventCalendar } from '@organisms/EventCalendar'
import { renderHead } from '@helpers/renderUtils'

const EventsPage = () => {
  return (
    <>
      {renderHead('Upcoming Events', 'Upcoming events in the Neat F2P server will be displayed here.')}
      <ContentBlock isWide>
        <EventCalendar />
      </ContentBlock>
    </>
  )
}

export default EventsPage
