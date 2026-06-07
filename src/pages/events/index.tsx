import { sharedStyles } from '@consts/styles/shared'
import { EventCalendar } from '@organisms/EventCalendar'
import { renderHead } from '@utils/renderUtils'

const EventsPage = () => {
  return (
    <>
      {renderHead('Upcoming Events', 'Upcoming events in the Neat F2P server will be displayed here.')}
      <div className={sharedStyles.wideContainer}>
        <EventCalendar />
      </div>
    </>
  )
}

export default EventsPage
