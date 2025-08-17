import { ContentBlock } from '@atoms/ContentBlock'
import { BodyText } from '@atoms/BodyText'
import { InlineLink } from '@atoms/InlineLink'
import { useRouter } from 'next/router'
import { UserIsLoggedIn } from '@helpers/users/users'
import { NotLoggedIn } from '@molecules/NotLoggedIn'
import { PageHeading } from '@atoms/PageHeading'
import { renderHead } from '@helpers/renderUtils'
import { User } from '@globalTypes/User'
import { NullUser } from '@models/NullUser'
import { sessionOptions } from '@models/session'
import { getIronSession } from 'iron-session'
import { GetServerSideProps } from 'next'

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
        <ContentBlock>
          <PageHeading>Success</PageHeading>
          <BodyText variant='body' bodyTextAlign='center'>
            {!accountName || accountName.length < 1 ? (
              <span>Your game account has been created. You can now log in.</span>
            ) : (
              <span>
                Your game account, <strong>{accountName}</strong>, has been created. You can now log in.
              </span>
            )}
          </BodyText>
          <BodyText variant='body' bodyTextAlign='center'>
            You may return to the
            <InlineLink href='/account/game-accounts'>game accounts page</InlineLink>.
          </BodyText>
        </ContentBlock>
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
