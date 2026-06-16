import { sharedStyles } from '@consts/styles/shared'
import { BodyText } from '@atoms/BodyText'
import { UserIsLoggedIn } from '@utils/users/users'
import { PageHeading } from '@atoms/PageHeading'
import { renderHead } from '@utils/renderUtils'
import { User } from '@globalTypes/User'
import { NullUser } from '@models/NullUser'
import { sessionOptions } from '@models/session'
import { getIronSession } from 'iron-session'
import { GetServerSideProps } from 'next'
import { StandardLink } from '@atoms/StandardLink'

type ResetPasswordSuccessPageProps = {
  user: User
}

const ResetPasswordSuccessPage = ({ user }: ResetPasswordSuccessPageProps) => (
  <>
    {renderHead('Success')}
    <div className={sharedStyles.defaultContainer}>
      <PageHeading>Reset Successful</PageHeading>
      <BodyText bodyTextAlign='center'>
        Your password was reset successfully.{' '}
        {!UserIsLoggedIn(user) && (
          <>
            You can now
            <StandardLink href='/account/login'>login</StandardLink>.
          </>
        )}
      </BodyText>
    </div>
  </>
)

export default ResetPasswordSuccessPage

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getIronSession(req, res, sessionOptions)
  const user: User = session?.user || NullUser

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  }
}
