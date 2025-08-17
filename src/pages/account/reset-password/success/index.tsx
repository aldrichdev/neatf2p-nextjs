import { ContentBlock } from '@atoms/ContentBlock'
import { BodyText } from '@atoms/BodyText'
import { InlineLink } from '@atoms/InlineLink'
import { UserIsLoggedIn } from '@helpers/users/users'
import { PageHeading } from '@atoms/PageHeading'
import { renderHead } from '@helpers/renderUtils'
import { User } from '@globalTypes/User'
import { NullUser } from '@models/NullUser'
import { sessionOptions } from '@models/session'
import { getIronSession } from 'iron-session'
import { GetServerSideProps } from 'next'

type ResetPasswordSuccessPageProps = {
  user: User
}

const ResetPasswordSuccessPage = ({ user }: ResetPasswordSuccessPageProps) => (
  <>
    {renderHead('Success')}
    <ContentBlock>
      <PageHeading>Reset Successful</PageHeading>
      <BodyText variant='body' bodyTextAlign='center'>
        Your password was reset successfully.{' '}
        {!UserIsLoggedIn(user) && (
          <>
            You can now
            <InlineLink href='/account/login'>login</InlineLink>.
          </>
        )}
      </BodyText>
    </ContentBlock>
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
