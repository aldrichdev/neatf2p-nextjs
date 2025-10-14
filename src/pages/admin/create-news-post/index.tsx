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

type CreateNewsPostPageProps = {
  user: User
}

// TODO: Make sure this still works
const CreateNewsPostPage = ({ user }: CreateNewsPostPageProps) => (
  <>
    {renderHead('Create News Post')}
    {!user?.isAdmin ? (
      <MustBeAdminBlock />
    ) : (
      <ContentBlock>
        <PageHeading>Create a News Post</PageHeading>
        <NewsPostForm userId={user.id} />
      </ContentBlock>
    )}
  </>
)

export default CreateNewsPostPage

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getIronSession(req, res, sessionOptions)
  const user: User = session?.user || NullUser

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  }
}
