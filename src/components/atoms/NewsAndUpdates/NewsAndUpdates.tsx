import axios from 'axios';
import { useState } from 'react'
import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import { ContentBlock } from '@atoms/ContentBlock'
import { NewsPostImage, NewsPostContent } from './NewsAndUpdates.styled'
import { NewsPost } from './NewsAndUpdates.d'

// Example is OSRS website: https://oldschool.runescape.com
// Using MUI component sample code: https://mui.com/material-ui/react-list/

// TODO: Right now, `newsPost.image` is a blob, or something containing a blob, so we need
// to update the code to render it from a blob. 
// Right now we get http://localhost:3001/[object%20Object] 404 (Not Found)
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

  if (!newsPosts || !Array.isArray(newsPosts) || !newsPosts?.some(newsPost => newsPost.title)) return null;

  // Now that we have a Base64 string coming from the DB, we need to start converting it to a blob.
  // const doThing = (base64String: string) => {
  //   const convertedBlob = b64toBlob(base64String)
  //   console.log('convertedBlob', convertedBlob)
  //   const convertedUrl = URL.createObjectURL(convertedBlob)

  //   setConvertedBlobUrl(convertedUrl)
  // }
  
  return (
    <ContentBlock>
      <Typography variant="h2">Latest News & Updates</Typography>
      <List>
        {newsPosts.map((newsPost : NewsPost) => (
          <div key={newsPost.id}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <NewsPostImage alt={newsPost.alt} src={newsPost.image} />
              </ListItemAvatar>
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
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </ContentBlock>
  )
}

export default NewsAndUpdates
