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
      <li className='mx-0 flex flex-wrap items-start gap-4 p-0 md:flex-nowrap'>
        <Link href={newsPostUrl} className='w-full md:mr-5 md:w-auto'>
          <div className='mt-2 flex justify-center md:justify-start'>
            <img
              src={newsPostImage}
              alt={newsPost.alt}
              className={cn('w-[60%] max-w-none md:w-21.25', isPlaceholder && 'rounded-[50%]')}
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
