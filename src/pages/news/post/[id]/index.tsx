import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { ContentBlock } from '@atoms/ContentBlock'
import { NewsPost } from '@globalTypes/NewsPost'
import { NewsPostDetailItem } from '@atoms/NewsPostDetailItem'
import { Spinner } from '@molecules/Spinner'

const NewsPostDetail = () => {
  const { query } = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [newsPost, setNewsPost] = useState<NewsPost | undefined>(undefined)

  useEffect(() => {
    const fetchNewsPost = () => {
      axios
        .get(`/api/getNewsPosts${query?.id ? `?id=${query.id}` : ''}`)
        .then(response => {
          if (response?.data?.length === 1) {
            setNewsPost(response.data[0])
            setIsLoading(false)
          }
        })
        .catch((error: string) => error)
    }

    if (newsPost === undefined) {
      fetchNewsPost()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  if (isLoading) {
    return <Spinner />
  }

  if (!newsPost?.title) return null

  return (
    <ContentBlock>
      <NewsPostDetailItem newsPost={newsPost} />
    </ContentBlock>
  )
}

export default NewsPostDetail
