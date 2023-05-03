import axios from 'axios';
import { useState } from 'react'
import { ListItemText, Typography, Divider } from "@mui/material";
import { ContentBlock } from '@atoms/ContentBlock'
import {
  NewsPostList,
  NewsPostListItem,
  NewsPostAvatar,
  NewsPostImage,
} from './NewsAndUpdates.styled'
import { NewsPost } from './NewsAndUpdates.d'
import { getImageUrlFromBase64 } from '@helpers/base64'
import { getPrettyDateStringFromISOString } from '@/lib/helpers/date/date'

// Example is OSRS website: https://oldschool.runescape.com
// Using MUI component sample code: https://mui.com/material-ui/react-list/``
const NewsAndUpdates = () => {
  console.log('NewsandUpdates renders')

  const [newsPosts, setNewsPosts] = useState<NewsPost[]|undefined>(undefined)
  const fetchNewsPosts = () => {
    console.log('fetchNewsPosts should only be called once', newsPosts)
    axios.get('/api/getNewsPosts')
      .then((response) => {
        setNewsPosts(response.data)
      })
      .catch((error : string) => error)
  }

  const getNewsPostImageUrl = (newsPostImage: string) => {
    // Show a placeholder image if there isn't an image in the database
    if (!newsPostImage) {
      return "/img/S2H.png"
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
    <ContentBlock>
      <Typography variant="h2">Latest News & Updates</Typography>
      <NewsPostList>
        {newsPosts.map((newsPost : NewsPost) => (
          <div key={newsPost.id}>
            <NewsPostListItem alignItems="flex-start">
              <NewsPostAvatar>
                <NewsPostImage alt={newsPost.alt} src={getNewsPostImageUrl(newsPost.image)} />
              </NewsPostAvatar>
              <ListItemText
                primary={
                  <Typography variant="body">{newsPost.title}</Typography>
                }
                secondary={
                  <>
                    <Typography variant="body">{getPrettyDateStringFromISOString(newsPost.datePosted)}</Typography>
                    <Typography variant="body" color="black">{newsPost.body}</Typography>
                  </>
                }
                secondaryTypographyProps={{ component: 'div' }}>
              </ListItemText>
            </NewsPostListItem>
            <Divider />
          </div>
        ))}
      </NewsPostList>
    </ContentBlock>
  )
}

export default NewsAndUpdates
