import { getPrettyDateStringFromISOString } from '@helpers/date/date'
import parse from 'html-react-parser'
import { NewsPostItemProps } from '@globalTypes/NewsPostItemProps'
import { getNewsPostImageUrl } from '@helpers/imageUtils'
import {
  NewsPostDetailContainer,
  NewsPostDetailImage,
  NewsPostDetailDate,
  NewsPostDetailAuthor,
  NewsPostDetailBody,
} from './NewsPostDetailItem.styled'
import { PageHeading } from '@atoms/PageHeading'

const NewsPostDetailItem = (props: NewsPostItemProps) => {
  const { newsPost } = props

  return (
    <NewsPostDetailContainer>
      <PageHeading>{newsPost.title}</PageHeading>
      <NewsPostDetailImage src={getNewsPostImageUrl(newsPost.image)} alt={newsPost.alt} />
      <NewsPostDetailDate variant='body'>{getPrettyDateStringFromISOString(newsPost.datePosted)}</NewsPostDetailDate>
      <NewsPostDetailAuthor variant='body'>Beast Fable</NewsPostDetailAuthor>
      <NewsPostDetailBody variant='body' component='span'>
        {parse(newsPost.body)}
      </NewsPostDetailBody>
    </NewsPostDetailContainer>
  )
}

export default NewsPostDetailItem
