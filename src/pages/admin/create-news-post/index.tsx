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
import { handleForbiddenRedirect, sendApiRequest } from '@helpers/api/apiUtils'
import { AxiosError } from 'axios'
import { NewsPostSubmitProps } from '@molecules/NewsPostForm/NewsPostForm.types'

type CreateNewsPostPageProps = {
  user: User
}

const CreateNewsPostPage = ({ user }: CreateNewsPostPageProps) => {
  const handleCreateNewsPost = (props: NewsPostSubmitProps) => {
    const { image, alt, title, bodyHtml, bodyInput, setSubmitResult } = props

    sendApiRequest('POST', '/api/createNewsPost', {
      userId: user.id,
      image,
      alt,
      title,
      datePosted: new Date(),
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
      {renderHead('Create News Post')}
      {!user?.isAdmin ? (
        <MustBeAdminBlock />
      ) : (
        <ContentBlock>
          <PageHeading>Create a News Post</PageHeading>
          <NewsPostForm userId={user.id} submitForm={handleCreateNewsPost} />
        </ContentBlock>
      )}
    </>
  )
}
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
