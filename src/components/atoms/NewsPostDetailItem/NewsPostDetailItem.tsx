import { getPrettyDateStringFromISOString } from '@helpers/date/date'
import parse from 'html-react-parser'
import { NewsPostItemProps } from 'src/globalTypes/NewsPostItemProps'
import { getNewsPostImageUrl } from '@helpers/imageUtils'
import {
  NewsPostDetailContainer,
  PageHeading,
  NewsPostTitle,
  NewsPostDetailImage,
  NewsPostDetailDate,
  NewsPostDetailAuthor,
  NewsPostDetailBody
} from './NewsPostDetailItem.styled'

const NewsPostDetailItem = (props: NewsPostItemProps) => {
  const { newsPost } = props;

  return (
    <NewsPostDetailContainer>
      <PageHeading variant="h2">News</PageHeading>
      <NewsPostTitle variant="h3">{newsPost.title}</NewsPostTitle>
      <NewsPostDetailImage src={getNewsPostImageUrl(newsPost.image)} alt={newsPost.alt} />
      <NewsPostDetailDate variant="body">{getPrettyDateStringFromISOString(newsPost.datePosted)}</NewsPostDetailDate>
      <NewsPostDetailAuthor variant="body">Beast Fable</NewsPostDetailAuthor>
      <NewsPostDetailBody variant="body">{parse(newsPost.body)}</NewsPostDetailBody>
    </NewsPostDetailContainer>
  )
}

export default NewsPostDetailItem;
