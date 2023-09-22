import axios from 'axios';
import { useState } from 'react'
import { Typography } from "@mui/material";
import { ContentBlock } from '@atoms/ContentBlock'
import { NewsPostList, ViewAllNewsLink } from './NewsAndUpdates.styled'
import { NewsPost } from '@lib/types/NewsPost';
import NewsPostListItem from '@molecules/NewsPostListItem/NewsPostListItem';

interface NewsAndUpdatesProps {
  heading: string
  /** Limits the number of news posts to show. */
  limit?: number
  showReadMore?: boolean
}

const NewsAndUpdates = (props: NewsAndUpdatesProps) => {
  const { heading, limit, showReadMore } = props
  const [newsPosts, setNewsPosts] = useState<NewsPost[]|undefined>(undefined)

  const fetchNewsPosts = () => {
    console.log('fetchNewsPosts should only be called once', newsPosts)
    axios.get(`/api/getNewsPosts${limit ? `?limit=${limit}` : ''}`)
      .then((response) => {
        setNewsPosts(response.data)
      })
      .catch((error : string) => error)
  }

  if (newsPosts === undefined) {
    fetchNewsPosts()
  }

  if (!newsPosts || !Array.isArray(newsPosts) || !newsPosts?.some(newsPost => newsPost.title)) return null

  return (
    <ContentBlock isHomepage>
      <Typography variant="h2">{heading}</Typography>
      <NewsPostList disablePadding>
        {newsPosts.map((newsPost : NewsPost) => (
          <NewsPostListItem key={newsPost.id} newsPost={newsPost} />
        ))}
      </NewsPostList>
      {showReadMore && newsPosts.length >= 1 && (
        <ViewAllNewsLink href='/news'>
          <Typography variant="body">View all news</Typography>
        </ViewAllNewsLink>
      )}
    </ContentBlock>
  )
}

export default NewsAndUpdates
