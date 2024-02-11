import { ListItemText, Typography, Divider, ListItemAvatar } from '@mui/material'
import {
  NewsPostLi,
  NewsPostTitleLink,
  NewsPostImage,
  NewsPostTitle,
  NewsPostAvatarLink,
} from './NewsPostListItem.styled'
import { NewsPostItemProps } from '@globalTypes/NewsPostItemProps'
import { getPrettyDateStringFromISOString } from '@helpers/date/date'
import ReadMore from '@molecules/ReadMore/ReadMore'
import { getNewsPostImageUrl } from '@helpers/imageUtils'

const NewsPostListItem = (props: NewsPostItemProps) => {
  const { newsPost } = props
  const newsPostUrl = `/news/post/${newsPost.id}`

  return (
    <div>
      <NewsPostLi alignItems='flex-start'>
        <NewsPostAvatarLink href={newsPostUrl}>
          <ListItemAvatar>
            <NewsPostImage src={getNewsPostImageUrl(newsPost.image)} alt={newsPost.alt} />
          </ListItemAvatar>
        </NewsPostAvatarLink>
        <ListItemText
          primary={
            <NewsPostTitleLink href={newsPostUrl}>
              <NewsPostTitle variant='body'>{newsPost.title}</NewsPostTitle>
            </NewsPostTitleLink>
          }
          secondary={
            <>
              <Typography variant='body'>{getPrettyDateStringFromISOString(newsPost.datePosted)}</Typography>
              <Typography variant='body' color='black' component='span'>
                <ReadMore linkHref={newsPostUrl}>{newsPost.body}</ReadMore>
              </Typography>
            </>
          }
          secondaryTypographyProps={{ component: 'div' }}
        ></ListItemText>
      </NewsPostLi>
      <Divider />
    </div>
  )
}

export default NewsPostListItem
