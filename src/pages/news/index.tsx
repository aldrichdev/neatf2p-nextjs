import { ContentBlock } from '@atoms/ContentBlock'
import { NewsAndUpdates } from '@organisms/NewsAndUpdates'
import Head from 'next/head'

const News = () => (
  <>
    <Head>
      <title>News | Neat F2P :: Nostalgia Reborn</title>
    </Head>
    <ContentBlock>
      <NewsAndUpdates heading='News' />
    </ContentBlock>
  </>
)

export default News
