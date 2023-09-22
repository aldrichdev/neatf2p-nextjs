import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { ContentBlock } from '@atoms/ContentBlock'
import { NewsPost } from '@globalTypes/NewsPost'
import { NewsPostDetailItem } from '@atoms/NewsPostDetailItem'

const NewsPostDetail = () => {
  const { query } = useRouter();
  const [newsPost, setNewsPost] = useState<NewsPost|undefined>(undefined)

  const fetchNewsPosts = () => {
    axios.get(`/api/getNewsPosts${query?.id ? `?id=${query.id}` : ''}`)
      .then((response) => {
        if (response?.data?.length === 1) {
          setNewsPost(response.data[0])
        }
      })
      .catch((error : string) => error)
  }

  if (newsPost === undefined) {
    fetchNewsPosts()
  }

  if (!newsPost?.title) return null

  return (
    <ContentBlock topMargin={20}>
      <NewsPostDetailItem newsPost={newsPost} />
    </ContentBlock>
  )
}

export default NewsPostDetail
