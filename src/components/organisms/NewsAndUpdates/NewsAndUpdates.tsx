import axios from 'axios'
import { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import { ContentBlock } from '@atoms/ContentBlock'
import { NewsPostList, ViewAllNewsLink } from './NewsAndUpdates.styled'
import { NewsPost } from '@globalTypes/NewsPost'
import { NewsPostListItem } from '@molecules/NewsPostListItem'
import { Spinner } from '@molecules/Spinner'

interface NewsAndUpdatesProps {
  heading: string
  /** Limits the number of news posts to show. */
  limit?: number
  showViewAllButton?: boolean
}

const NewsAndUpdates = (props: NewsAndUpdatesProps) => {
  const { heading, limit, showViewAllButton } = props
  const [isLoading, setIsLoading] = useState(true)
  const [newsPosts, setNewsPosts] = useState<NewsPost[]|undefined>(undefined)

  useEffect(() => {
    const fetchNewsPosts = () => {
      axios.get(`/api/getNewsPosts${limit ? `?limit=${limit}` : ''}`)
        .then((response) => {
          setNewsPosts(response.data)
          setIsLoading(false)
        })
        .catch((error : string) => error)
    }

    if (newsPosts === undefined) {
      fetchNewsPosts()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return (
      <Spinner />
    )
  }

  if (!newsPosts || !Array.isArray(newsPosts) || !newsPosts?.some(newsPost => newsPost.title)) return null

  return (
    <ContentBlock isWide>
      <Typography variant="h2">{heading}</Typography>
      <NewsPostList disablePadding>
        {newsPosts.map((newsPost : NewsPost) => (
          <NewsPostListItem key={newsPost.id} newsPost={newsPost} />
        ))}
      </NewsPostList>
      {showViewAllButton && newsPosts.length > 3 && (
        <ViewAllNewsLink href='/news'>
          <Typography variant="body">View all news</Typography>
        </ViewAllNewsLink>
      )}
    </ContentBlock>
  )
}

export default NewsAndUpdates
