import { ContentBlock } from '@atoms/ContentBlock'
import { renderHead } from '@helpers/renderUtils'
import { NewsAndUpdates } from '@organisms/NewsAndUpdates'

const News = () => (
  <>
    {renderHead('News', 'Read the latest news of Neat F2P.')}
    <ContentBlock>
      <NewsAndUpdates heading='News' />
    </ContentBlock>
  </>
)

export default News
