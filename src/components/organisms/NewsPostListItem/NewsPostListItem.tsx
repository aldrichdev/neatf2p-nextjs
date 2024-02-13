import { ListItemText, Typography, Divider } from '@mui/material'
import {
  NewsPostLi,
  NewsPostTitleLink,
  NewsPostImage,
  NewsPostTitle,
  NewsPostAvatarLink,
  NewsPostAvatar,
  NewsPostBody,
} from './NewsPostListItem.styled'
import { NewsPostItemProps } from '@globalTypes/NewsPostItemProps'
import { getPrettyDateStringFromISOString } from '@helpers/date/date'
import ReadMore from '@molecules/ReadMore/ReadMore'
import { getNewsPostImageUrl } from '@helpers/imageUtils'

const NewsPostListItem = (props: NewsPostItemProps) => {
  const { newsPost } = props
  const newsPostUrl = `/news/post/${newsPost.id}`
  const newsPostImage = getNewsPostImageUrl(newsPost.image)

  return (
    <div>
      <NewsPostLi alignItems='flex-start'>
        <NewsPostAvatarLink href={newsPostUrl}>
          <NewsPostAvatar>
            <NewsPostImage
              src={newsPostImage}
              alt={newsPost.alt}
              isPlaceholder={newsPostImage === '/img/NewsImagePlaceholder.png'}
            />
          </NewsPostAvatar>
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
              <NewsPostBody variant='body' color='black' component='span'>
                <ReadMore linkHref={newsPostUrl}>{newsPost.body}</ReadMore>
              </NewsPostBody>
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
