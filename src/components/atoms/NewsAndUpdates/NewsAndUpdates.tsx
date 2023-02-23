import Typography from '@mui/material/Typography'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import Avatar from '@mui/material/Avatar'
import { ContentBlock } from '@atoms/ContentBlock'
import { NewsPostImage, NewsPostContent } from './NewsAndUpdates.styled'

// Example is OSRS website: https://oldschool.runescape.com
// Using MUI component sample code: https://mui.com/material-ui/react-list/

interface Image {
  src: string
  alt: string
}

interface NewsPost {
  image: Image
  title: string
  date: string
  body: string
}

interface NewsAndUpdatesProps {
  newsPosts: NewsPost[]
}

const NewsAndUpdates = (props: NewsAndUpdatesProps) => {
  const { newsPosts } = props
  
  if (!newsPosts || !newsPosts.some(newsPost => newsPost.title)) return null;

  return (
    <ContentBlock>
      <Typography variant="h2">Latest News & Updates</Typography>
      <List>
        {newsPosts.map((newsPost : NewsPost) => (
          <>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <NewsPostImage alt={newsPost.image?.alt} src={newsPost.image?.src} />
              </ListItemAvatar>
              <NewsPostContent
                primary={
                  <Typography variant="body">{newsPost.title}</Typography>
                }
                secondary={
                  <>
                    <Typography variant="body">{newsPost.date}</Typography>
                    <Typography variant="body" color="black">{newsPost.body}</Typography>
                  </>
                }
                secondaryTypographyProps={{ component: 'div' }}>
              </NewsPostContent>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </ContentBlock>
  )
}

export default NewsAndUpdates
