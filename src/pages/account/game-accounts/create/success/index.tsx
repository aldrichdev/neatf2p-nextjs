import { sharedStyles } from '@consts/styles/shared'
import { BodyText } from '@atoms/BodyText'
import { useRouter } from 'next/router'
import { UserIsLoggedIn } from '@utils/users/users'
import { NotLoggedIn } from '@molecules/NotLoggedIn'
import { PageHeading } from '@atoms/PageHeading'
import { renderHead } from '@utils/renderUtils'
import { User } from '@globalTypes/User'
import { NullUser } from '@models/NullUser'
import { sessionOptions } from '@models/session'
import { getIronSession } from 'iron-session'
import { GetServerSideProps } from 'next'
import { StandardLink } from '@atoms/StandardLink'

type CreateGameAccountSuccessPageProps = {
  user: User
}

const CreateGameAccountSuccessPage = ({ user }: CreateGameAccountSuccessPageProps) => {
  const { query } = useRouter()
  const accountName = query['accountName']

  return (
    <>
      {renderHead('Success')}
      {!UserIsLoggedIn(user) ? (
        <NotLoggedIn />
      ) : (
        <div className={sharedStyles.defaultContainer}>
          <PageHeading>Success</PageHeading>
          <BodyText bodyTextAlign='center'>
            {!accountName || accountName.length < 1 ? (
              <span>Your game account has been created. You can now log in.</span>
            ) : (
              <span>
                Your game account, <strong className='font-mono'>{accountName}</strong>, has been created. You can now
                log in.
              </span>
            )}
          </BodyText>
          <BodyText bodyTextAlign='center'>
            You may return to the <StandardLink href='/account/game-accounts'>game accounts page</StandardLink>.
          </BodyText>
        </div>
      )}
    </>
  )
}

export default CreateGameAccountSuccessPage

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getIronSession(req, res, sessionOptions)
  const user: User = session?.user || NullUser

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  }
}
