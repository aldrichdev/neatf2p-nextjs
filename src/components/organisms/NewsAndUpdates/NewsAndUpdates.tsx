import { useEffect, useState } from 'react'
import { NewsPost } from '@globalTypes/NewsPost'
import { NewsPostListItem } from '@organisms/NewsPostListItem'
import { Spinner } from '@molecules/Spinner'
import { PageHeading } from '@atoms/PageHeading'
import { sendApiRequest } from '@utils/api/apiUtils'

interface NewsAndUpdatesProps {
  heading: string
  /** Limits the number of news posts to show. */
  limit?: number
}

const NewsAndUpdates = (props: NewsAndUpdatesProps) => {
  const { heading, limit } = props
  const [isLoading, setIsLoading] = useState(true)
  const [newsPosts, setNewsPosts] = useState<NewsPost[] | undefined>(undefined)

  useEffect(() => {
    const fetchNewsPosts = () => {
      sendApiRequest('GET', `/api/getNewsPosts${limit ? `?limit=${limit}` : ''}`)
        .then(response => {
          setNewsPosts(response.data)
          setIsLoading(false)
        })
        .catch((error: string) => error)
    }

    if (newsPosts === undefined) {
      fetchNewsPosts()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return <Spinner />
  }

  if (!newsPosts || !Array.isArray(newsPosts) || !newsPosts?.some(newsPost => newsPost.title)) return null

  return (
    <div className='w-full'>
      <PageHeading>{heading}</PageHeading>
      <ul className='flex flex-col justify-center gap-5 p-0! mt-10'>
        {newsPosts.map((newsPost: NewsPost) => (
          <NewsPostListItem key={newsPost.id} newsPost={newsPost} />
        ))}
      </ul>
    </div>
  )
}

export default NewsAndUpdates
