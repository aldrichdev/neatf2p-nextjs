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
      <img src={getNewsPostImageUrl(newsPost.image)} alt={newsPost.alt} className='mt-5 max-w-full md:max-w-[300px]' />
      <p className='mt-2.5 text-base text-neutral-500'>{getPrettyDateStringFromISOString(newsPost.datePosted)}</p>
      <p className='text-base text-neutral-500'>Beast Fable</p>
      <span className='block mt-5 break-words md:mt-10 news-post-detail-body'>{parse(newsPost.body)}</span>
    </div>
  )
}

export default NewsPostDetailItem
