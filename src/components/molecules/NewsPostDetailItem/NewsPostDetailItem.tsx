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
      <img src={getNewsPostImageUrl(newsPost.image)} alt={newsPost.alt} className='mt-5 max-w-full md:max-w-75' />
      <p className='mt-2.5 text-base text-neutral-500'>{getPrettyDateStringFromISOString(newsPost.datePosted)}</p>
      <p className='text-base text-neutral-500'>Beast Fable</p>
      <span className='news-post-detail-body mt-5 block wrap-break-word md:mt-10'>{parse(newsPost.body)}</span>
    </div>
  )
}

export default NewsPostDetailItem
