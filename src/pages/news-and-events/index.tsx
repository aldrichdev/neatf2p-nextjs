import { ContentBlock } from '@atoms/ContentBlock'
import { EventCalendar } from '@atoms/EventCalendar'
import { PageTabs } from '@atoms/PageTabs'
import { renderHead } from '@helpers/renderUtils'
import { NewsAndUpdates } from '@organisms/NewsAndUpdates'
import { useState } from 'react'

const News = () => {
  const [activeTab, setActiveTab] = useState<string>('News')

  return (
    <>
      {renderHead('News & Events')}
      <ContentBlock>
        <PageTabs tabs={['News', 'Events']} activeTab={activeTab} setActiveTab={setActiveTab} />
      </ContentBlock>
      {activeTab === 'News' ? (
        <ContentBlock>
          <NewsAndUpdates heading='News' />
        </ContentBlock>
      ) : (
        <ContentBlock isWide>
          <EventCalendar />
        </ContentBlock>
      )}
    </>
  )
}

export default News
