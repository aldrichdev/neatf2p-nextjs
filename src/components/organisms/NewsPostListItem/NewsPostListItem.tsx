import { NewsPostItemProps } from '@globalTypes/NewsPostItemProps'
import { getPrettyDateStringFromISOString } from '@utils/date/date'
import ReadMore from '@molecules/ReadMore/ReadMore'
import { getNewsPostImageUrl } from '@utils/imageUtils'
import { cn } from '@utils/cn'
import Link from 'next/link'
import clsx from 'clsx'

const NewsPostListItem = (props: NewsPostItemProps) => {
  const { newsPost } = props
  const newsPostUrl = `/news/post/${newsPost.id}`
  const newsPostImage = getNewsPostImageUrl(newsPost.image)
  const isPlaceholder = newsPostImage === '/img/NewsImagePlaceholder.png'

  return (
    <Link href={newsPostUrl}>
      <li
        className={clsx(
          'bg-sidebar-bg border-divider hover:border-primary-dark flex flex-wrap',
          'gap-4 rounded-xl border p-4 transition-transform hover:scale-101',
        )}
      >
        <div className='flex flex-nowrap items-center gap-4'>
          <img src={newsPostImage} alt={newsPost.alt} className={cn('w-18', isPlaceholder && 'rounded-[50%]')} />
          <div className='text-left'>
            <p className='text-text-base hover:text-text-base font-semibold'>{newsPost.title}</p>
            <div>
              <p className='text-neutral-500'>{getPrettyDateStringFromISOString(newsPost.datePosted)}</p>
            </div>
          </div>
        </div>
        <span className='text-text-base'>
          <ReadMore>{newsPost.body}</ReadMore>
        </span>
      </li>
    </Link>
  )
}

export default NewsPostListItem
