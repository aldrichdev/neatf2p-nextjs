import { ListItemText, Typography, Divider } from '@mui/material'
import {
  NewsPostLi,
  NewsPostTitleLink,
  NewsPostTitle,
  NewsPostAvatarLink,
  NewsPostBody,
} from './NewsPostListItem.styled'
import { NewsPostItemProps } from '@globalTypes/NewsPostItemProps'
import { getPrettyDateStringFromISOString } from '@utils/date/date'
import ReadMore from '@molecules/ReadMore/ReadMore'
import { getNewsPostImageUrl } from '@utils/imageUtils'
import { cn } from '@utils/cn'

const NewsPostListItem = (props: NewsPostItemProps) => {
  const { newsPost } = props
  const newsPostUrl = `/news/post/${newsPost.id}`
  const newsPostImage = getNewsPostImageUrl(newsPost.image)
  const isPlaceholder = newsPostImage === '/img/NewsImagePlaceholder.png'

  return (
    <div>
      <NewsPostLi alignItems='flex-start'>
        <NewsPostAvatarLink href={newsPostUrl}>
          <div className='flex justify-center text-center mt-2'>
            <img
              src={newsPostImage}
              alt={newsPost.alt}
              className={cn('w-[60%] md:w-21.25 max-w-none', isPlaceholder && 'rounded-[50%]')}
            />
          </div>
        </NewsPostAvatarLink>
        <ListItemText
          primary={
            <NewsPostTitleLink href={newsPostUrl}>
              <NewsPostTitle variant='body'>{newsPost.title}</NewsPostTitle>
            </NewsPostTitleLink>
          }
          secondary={
            <>
              <Typography variant='body' sx={{ color: 'gray' }}>
                {getPrettyDateStringFromISOString(newsPost.datePosted)}
              </Typography>
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
