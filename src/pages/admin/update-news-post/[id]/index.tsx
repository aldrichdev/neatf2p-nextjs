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

type UpdateNewsPostPageProps = {
  user: User
}

// TODO: Clean up
const UpdateNewsPostPage = ({ user }: UpdateNewsPostPageProps) => {
  return (
    <>
      {renderHead('Update News Post')}
      {!user?.isAdmin ? (
        <MustBeAdminBlock />
      ) : (
        <ContentBlock>
          <PageHeading>Update a News Post</PageHeading>
          <NewsPostForm newsPostId={tbd} imageId={tbd} userId={user.id} />
        </ContentBlock>
      )}
    </>
  )
}

export default UpdateNewsPostPage

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getIronSession(req, res, sessionOptions)
  const user: User = session?.user || NullUser

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  }
}
