import { ContentBlock } from '@atoms/ContentBlock'
import { renderHead } from '@helpers/renderUtils'
import { NewsAndUpdates } from '@organisms/NewsAndUpdates'

const News = () => (
  <>
    {renderHead('News')}
    <ContentBlock>
      <NewsAndUpdates heading='News' />
    </ContentBlock>
  </>
)

export default News
