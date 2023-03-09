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

interface NewsAndUpdatesProps {
  newsPosts: NewsPost[]
}

const NewsAndUpdates = (props: NewsAndUpdatesProps) => {
  const { newsPosts } = props
  console.log('NewsandUpdates renders')
  
  // This component seems to re-render too many times.
  // ERR_INSUFFICIENT_RESOURCES is seen in the console a lot. With hundreds of errors or messages.
  // Right now, `newsPost.image` is a blob, or something containing a blob, so we need
  // to update the code to render it from a blob.

  if (!newsPosts || !Array.isArray(newsPosts) || !newsPosts?.some(newsPost => newsPost.title)) return null;

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
