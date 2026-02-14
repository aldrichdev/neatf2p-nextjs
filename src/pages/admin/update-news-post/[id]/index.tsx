import { MustBeAdminBlock } from '@molecules/MustBeAdminBlock'
import { PageHeading } from '@atoms/PageHeading'
import { ContentBlock } from '@atoms/ContentBlock'
import { renderHead } from '@helpers/renderUtils'
import { User } from '@globalTypes/User'
import { NullUser } from '@models/NullUser'
import { sessionOptions } from '@models/session'
import { getIronSession } from 'iron-session'
import { GetServerSideProps } from 'next'
import { NewsPostForm } from '@organisms/NewsPostForm'
import { NewsPost } from '@globalTypes/NewsPost'
import { getWebsiteBaseUrl } from '@helpers/envUtils'
import { handleForbiddenRedirect, sendApiRequest } from '@helpers/api/apiUtils'
import { AxiosError } from 'axios'
import { NewsPostSubmitProps } from '@organisms/NewsPostForm/NewsPostForm.types'

type UpdateNewsPostPageProps = {
  /** The news post that is being updated. */
  newsPost: NewsPost
  user: User
}

const UpdateNewsPostPage = ({ newsPost, user }: UpdateNewsPostPageProps) => {
  const handleUpdateNewsPost = (props: NewsPostSubmitProps) => {
    const { image, alt, title, bodyHtml, bodyInput, setSubmitResult } = props

    if (newsPost?.id === null) {
      return
    }

    sendApiRequest('POST', '/api/updateNewsPost', {
      userId: user.id,
      newsPostId: newsPost?.id,
      image,
      alt,
      title,
      body: bodyHtml,
      bodyInput,
    })
      .then(response => {
        setSubmitResult({
          answer: response?.data,
          code: response?.data?.includes('Success') ? 'green' : 'red',
        })
      })
      .catch((error: AxiosError<string>) => {
        setSubmitResult({
          answer: error?.response?.data || '',
          code: 'red',
        })

        handleForbiddenRedirect(error)
      })
  }

  return (
    <>
      {renderHead('Update News Post')}
      {!user?.isAdmin ? (
        <MustBeAdminBlock />
      ) : (
        <ContentBlock>
          <PageHeading>Update a News Post</PageHeading>
          <NewsPostForm newsPost={newsPost} onSubmitForm={handleUpdateNewsPost} />
        </ContentBlock>
      )}
    </>
  )
}

export default UpdateNewsPostPage

export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
  const fetchUrl = `${getWebsiteBaseUrl()}/api/getNewsPosts${params?.id ? `?id=${params.id}` : ''}`
  const response = await fetch(fetchUrl)
  const newsPosts = await response.json()

  const session = await getIronSession(req, res, sessionOptions)
  const user: User = session?.user || NullUser

  if (newsPosts.length === 1) {
    return {
      props: {
        newsPost: newsPosts[0],
        user: JSON.parse(JSON.stringify(user)),
      },
    }
  }

  return {
    notFound: true,
  }
}
