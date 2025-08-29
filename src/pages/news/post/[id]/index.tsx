import { ContentBlock } from '@atoms/ContentBlock'
import { NewsPost } from '@globalTypes/NewsPost'
import { NewsPostDetailItem } from '@atoms/NewsPostDetailItem'
import { renderHead } from '@helpers/renderUtils'
import { GetStaticPaths, GetStaticProps } from 'next'
import { getWebsiteBaseUrl } from '@helpers/envUtils'

type NewsPostDetailProps = {
  newsPost: NewsPost
}

const NewsPostDetail = ({ newsPost }: NewsPostDetailProps) => {
  if (!newsPost?.title) return null

  return (
    <>
      {renderHead(newsPost.title)}
      <ContentBlock>
        <NewsPostDetailItem newsPost={newsPost} />
      </ContentBlock>
    </>
  )
}

export default NewsPostDetail

export const getStaticProps: GetStaticProps = async context => {
  const { params } = context
  const fetchUrl = `${getWebsiteBaseUrl()}/api/getNewsPosts${params?.id ? `?id=${params.id}` : ''}`

  // Call an external API endpoint to get the requested post
  const res = await fetch(fetchUrl)
  const newsPosts = await res.json()

  if (newsPosts.length === 1) {
    // The `NewsPostDetail` component will receive `newsPost` as a prop at build time
    return {
      props: {
        newsPost: newsPosts[0],
      },
      revalidate: 60,
    }
  }

  return {
    notFound: true,
    revalidate: 60,
  }
}

// Next.js requires this to be here for dynamic routes, or we will see: `getStaticPaths is required for dynamic SSG pages`
export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], // Indicates that no page needs be created at build time
    fallback: 'blocking', // Indicates the type of fallback
  }
}
