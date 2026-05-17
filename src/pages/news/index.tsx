import { renderHead } from '@utils/renderUtils'
import { NewsAndUpdates } from '@organisms/NewsAndUpdates'

const News = () => (
  <>
    {renderHead('News', 'Read the latest news of Neat F2P.')}
    <div className='mx-auto max-w-200'>
      <NewsAndUpdates heading='News' />
    </div>
  </>
)

export default News
