import { ContentBlock } from '@atoms/ContentBlock'
import { NewsPost } from '@globalTypes/NewsPost'
import { NewsPostDetailItem } from '@molecules/NewsPostDetailItem'
import { renderHead } from '@helpers/renderUtils'
import { GetServerSideProps } from 'next'
import { getWebsiteBaseUrl } from '@helpers/envUtils'

type NewsPostDetailProps = {
  newsPost: NewsPost
}

const NewsPostDetail = ({ newsPost }: NewsPostDetailProps) => {
  if (!newsPost?.title) return null

  return (
    <>
      {renderHead(newsPost.title, newsPost.body.replace(/(<([^>]+)>)/gi, ''))}
      <ContentBlock>
        <NewsPostDetailItem newsPost={newsPost} />
      </ContentBlock>
    </>
  )
}

export default NewsPostDetail

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const fetchUrl = `${getWebsiteBaseUrl()}/api/getNewsPosts${params?.id ? `?id=${params.id}` : ''}`

  // Call an external API endpoint to get the requested post
  const response = await fetch(fetchUrl)
  const newsPosts = await response.json()

  if (newsPosts.length === 1) {
    // The `NewsPostDetail` component will receive `newsPost` as a prop at build time
    return {
      props: {
        newsPost: newsPosts[0],
      },
    }
  }

  return {
    notFound: true,
  }
}
