import { NewsPostItemProps } from '@globalTypes/NewsPostItemProps'
import { getPrettyDateStringFromISOString } from '@utils/date/date'
import ReadMore from '@molecules/ReadMore/ReadMore'
import { getNewsPostImageUrl } from '@utils/imageUtils'
import { cn } from '@utils/cn'
import Link from 'next/link'
import { StandardLink } from '@atoms/StandardLink'

const NewsPostListItem = (props: NewsPostItemProps) => {
  const { newsPost } = props
  const newsPostUrl = `/news/post/${newsPost.id}`
  const newsPostImage = getNewsPostImageUrl(newsPost.image)
  const isPlaceholder = newsPostImage === '/img/NewsImagePlaceholder.png'

  return (
    <div>
      <li className='flex items-start flex-wrap gap-4 p-0 mt-2.5 mx-0 mb-5 md:flex-nowrap'>
        <Link href={newsPostUrl} className='w-full md:w-auto md:mr-5'>
          <div className='flex justify-center mt-2 md:justify-start'>
            <img
              src={newsPostImage}
              alt={newsPost.alt}
              className={cn('w-[60%] md:w-21.25 max-w-none', isPlaceholder && 'rounded-[50%]')}
            />
          </div>
        </Link>
        <div className='text-left'>
          <p>
            <StandardLink href={newsPostUrl} hoverUnderline className='font-semibold text-black hover:text-black'>
              {newsPost.title}
            </StandardLink>
          </p>
          <div>
            <p className='text-gray-500'>{getPrettyDateStringFromISOString(newsPost.datePosted)}</p>
            <span className='text-black'>
              <ReadMore linkHref={newsPostUrl}>{newsPost.body}</ReadMore>
            </span>
          </div>
        </div>
      </li>
    </div>
  )
}

export default NewsPostListItem
