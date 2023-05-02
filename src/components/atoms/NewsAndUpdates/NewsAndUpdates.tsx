import axios from 'axios';
import { useState } from 'react'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import { ContentBlock } from '@atoms/ContentBlock'
import {
  NewsPostList,
  NewsPostListItem,
  NewsPostAvatar,
  NewsPostImage,
  NewsPostContent
} from './NewsAndUpdates.styled'
import { NewsPost } from './NewsAndUpdates.d'
import { getImageUrlFromBase64 } from '@helpers/base64'

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

  if (newsPosts === undefined) {
    fetchNewsPosts()
  }

  if (!newsPosts || !Array.isArray(newsPosts) || !newsPosts?.some(newsPost => newsPost.title)) return null

  // TODO: Handle this as a different Jira ticket. You're just trying to get the submit form 100% in this branch!
  // newsPosts.sort((a, b) => {
  //   // Turn your strings into dates, and then subtract them
  //   // to get a value that is either negative, positive, or zero.
  //   return new Date(b.datePosted) - new Date(a.datePosted)
  // })

  return (
    <ContentBlock>
      <Typography variant="h2">Latest News & Updates</Typography>
      <NewsPostList>
        {newsPosts.map((newsPost : NewsPost) => (
          <div key={newsPost.id}>
            <NewsPostListItem alignItems="flex-start">
              <NewsPostAvatar>
                <NewsPostImage alt={newsPost.alt} src={getImageUrlFromBase64(newsPost.image)} />
              </NewsPostAvatar>
              <NewsPostContent
                primary={
                  <Typography variant="body">{newsPost.title}</Typography>
                }
                secondary={
                  <>
                    <Typography variant="body">{newsPost.datePosted}</Typography>
                    <Typography variant="body" color="black">{newsPost.body}</Typography>
                  </>
                }
                secondaryTypographyProps={{ component: 'div' }}>
              </NewsPostContent>
            </NewsPostListItem>
            <Divider />
          </div>
        ))}
      </NewsPostList>
    </ContentBlock>
  )
}

export default NewsAndUpdates
