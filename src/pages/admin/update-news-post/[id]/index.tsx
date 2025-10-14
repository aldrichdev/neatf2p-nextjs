import { MustBeAdminBlock } from '@molecules/MustBeAdminBlock'
import { PageHeading } from '@atoms/PageHeading'
import { ContentBlock } from '@atoms/ContentBlock'
import { renderHead } from '@helpers/renderUtils'
import { User } from '@globalTypes/User'
import { NullUser } from '@models/NullUser'
import { sessionOptions } from '@models/session'
import { getIronSession } from 'iron-session'
import { GetServerSideProps } from 'next'
import { NewsPostForm } from '@molecules/NewsPostForm'
import { NewsPost } from '@globalTypes/NewsPost'
import { getWebsiteBaseUrl } from '@helpers/envUtils'

type UpdateNewsPostPageProps = {
  /** The news post that is being updated. */
  newsPost: NewsPost
  user: User
}

const UpdateNewsPostPage = ({ newsPost, user }: UpdateNewsPostPageProps) => {
  return (
    <>
      {renderHead('Update News Post')}
      {!user?.isAdmin ? (
        <MustBeAdminBlock />
      ) : (
        <ContentBlock>
          <PageHeading>Update a News Post</PageHeading>
          <NewsPostForm newsPost={newsPost} userId={user.id} />
        </ContentBlock>
      )}
    </>
  )
}

export default UpdateNewsPostPage

export const getServerSideProps: GetServerSideProps = async ({ req, res, params }) => {
  const fetchUrl = `${getWebsiteBaseUrl()}/api/getNewsPosts${params?.id ? `?id=${params.id}` : ''}`
  const apiResponse = await fetch(fetchUrl)
  const newsPosts = await apiResponse.json()

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

// TODO: This can't be used with getServerSideProps, do we need it?
// export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
//   return {
//     paths: [],
//     fallback: 'blocking',
//   }
// }
