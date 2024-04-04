import { ContentBlock } from '@atoms/ContentBlock'
import { NewsAndUpdates } from '@organisms/NewsAndUpdates'
import Head from 'next/head'
import { SharedBrowserTitle } from 'src/constants'

const News = () => (
  <>
    <Head>
      <title>News | {SharedBrowserTitle}</title>
    </Head>
    <ContentBlock>
      <NewsAndUpdates heading='News' />
    </ContentBlock>
  </>
)

export default News
