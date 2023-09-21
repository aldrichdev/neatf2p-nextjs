import axios from 'axios';
import { useState } from 'react'
import { ListItemText, Typography, Divider } from "@mui/material";
import { ContentBlock } from '@atoms/ContentBlock'
import {
  NewsPostList,
  NewsPostListItem,
  NewsPostAvatar,
  NewsPostImage,
  NewsPostTitle,
  ReadMoreLink,
} from './NewsAndUpdates.styled'
import { NewsPost } from './NewsAndUpdates.d'
import { getImageUrlFromBase64 } from '@helpers/base64'
import { getPrettyDateStringFromISOString } from '@helpers/date/date'
import parse from 'html-react-parser';

interface NewsAndUpdatesProps {
  heading: string;
  /** Limits the number of news posts to show. */
  limit?: number;
  showReadMore?: boolean;
}

const NewsAndUpdates = (props: NewsAndUpdatesProps) => {
  const { heading, limit, showReadMore } = props;
  const [newsPosts, setNewsPosts] = useState<NewsPost[]|undefined>(undefined)

  const fetchNewsPosts = () => {
    console.log('fetchNewsPosts should only be called once', newsPosts)
    axios.get(`/api/getNewsPosts${limit ? `?limit=${limit}` : ''}`)
      .then((response) => {
        setNewsPosts(response.data)
      })
      .catch((error : string) => error)
  }

  const getNewsPostImageUrl = (newsPostImage: string) => {
    // Show a placeholder image if there isn't an image in the database
    if (!newsPostImage) {
      return "/img/NeatF2PLogo-Compact.png"
    }

    return getImageUrlFromBase64(newsPostImage)
  }

  if (newsPosts === undefined) {
    fetchNewsPosts()
  }

  if (!newsPosts || !Array.isArray(newsPosts) || !newsPosts?.some(newsPost => newsPost.title)) return null

  // Make latest posts appear first
  newsPosts.sort((a, b) => {
    const aDatePosted = new Date(a.datePosted)
    const bDatePosted = new Date(b.datePosted)

    return bDatePosted.getTime() - aDatePosted.getTime()
  })

  return (
    <ContentBlock isHomepage>
      <Typography variant="h2">{heading}</Typography>
      <NewsPostList disablePadding>
        {newsPosts.map((newsPost : NewsPost) => (
          <div key={newsPost.id}>
            <NewsPostListItem alignItems="flex-start">
              <NewsPostAvatar>
                <NewsPostImage alt={newsPost.alt} src={getNewsPostImageUrl(newsPost.image)} />
              </NewsPostAvatar>
              <ListItemText
                primary={
                  <NewsPostTitle variant="body">{newsPost.title}</NewsPostTitle>
                }
                secondary={
                  <>
                    <Typography variant="body">{getPrettyDateStringFromISOString(newsPost.datePosted)}</Typography>
                    <Typography variant="body" color="black">{parse(newsPost.body)}</Typography>
                  </>
                }
                secondaryTypographyProps={{ component: 'div' }}>
              </ListItemText>
            </NewsPostListItem>
            <Divider />
          </div>
        ))}
      </NewsPostList>
      {showReadMore && newsPosts.length >= 3 && (
        <ReadMoreLink href='/news'>
          <Typography variant="body">Read more</Typography>
        </ReadMoreLink>
      )}
    </ContentBlock>
  )
}

export default NewsAndUpdates
