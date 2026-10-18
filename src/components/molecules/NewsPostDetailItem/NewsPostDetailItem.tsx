import { getPrettyDateStringFromISOString } from '@utils/date/date'
import parse from 'html-react-parser'
import { NewsPostItemProps } from '@globalTypes/NewsPostItemProps'
import { getNewsPostImageUrl } from '@utils/imageUtils'
import { PageHeading } from '@atoms/PageHeading'

const NewsPostDetailItem = (props: NewsPostItemProps) => {
  const { newsPost } = props

  return (
    <div className='text-left'>
      <PageHeading>{newsPost.title}</PageHeading>
      <img src={getNewsPostImageUrl(newsPost.image)} alt={newsPost.alt} className='mx-auto mt-5 max-w-50' />
      <p className='mt-5 text-base text-neutral-500'>{getPrettyDateStringFromISOString(newsPost.datePosted)}</p>
      <p className='text-base text-neutral-500'>Posted by Beast Fable</p>
      <span className='news-post-detail-body mt-5 block wrap-break-word'>{parse(newsPost.body)}</span>
    </div>
  )
}

export default NewsPostDetailItem
