import { sharedStyles } from '@consts/styles/shared'
import { BodyText } from '@atoms/BodyText'
import { PageHeading } from '@atoms/PageHeading'
import { renderHead } from '@utils/renderUtils'
import { User } from '@globalTypes/User'
import { NullUser } from '@models/NullUser'
import { sessionOptions } from '@models/session'
import { getIronSession } from 'iron-session'
import { GetServerSideProps } from 'next'
import { StandardLink } from '@atoms/StandardLink'

type CreateAccountSuccessPageProps = {
  user: User
}

const CreateAccountSuccessPage = ({ user }: CreateAccountSuccessPageProps) => (
  <>
    {renderHead('Success')}
    <div className={sharedStyles.defaultContainer}>
      <PageHeading>Success</PageHeading>
      <BodyText bodyTextAlign='center'>
        Your account, <strong>{user?.username}</strong>, has been created! You can now view your{' '}
        <StandardLink href='/account'>Account page</StandardLink>.
      </BodyText>
    </div>
  </>
)

export default CreateAccountSuccessPage

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getIronSession(req, res, sessionOptions)
  const user: User = session?.user || NullUser

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  }
}
