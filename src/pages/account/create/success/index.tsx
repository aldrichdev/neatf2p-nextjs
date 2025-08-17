import { ContentBlock } from '@atoms/ContentBlock'
import { BodyText } from '@atoms/BodyText'
import { InlineLink } from '@atoms/InlineLink'
import { PageHeading } from '@atoms/PageHeading'
import { renderHead } from '@helpers/renderUtils'
import { User } from '@globalTypes/User'
import { NullUser } from '@models/NullUser'
import { sessionOptions } from '@models/session'
import { getIronSession } from 'iron-session'
import { GetServerSideProps } from 'next'

type CreateAccountSuccessPageProps = {
  user: User
}

const CreateAccountSuccessPage = ({ user }: CreateAccountSuccessPageProps) => (
  <>
    {renderHead('Success')}
    <ContentBlock>
      <PageHeading>Success</PageHeading>
      <BodyText variant='body' bodyTextAlign='center'>
        Your account, <strong>{user?.username}</strong>, has been created! You can now view your
        <InlineLink href='/account'>Account page</InlineLink>.
      </BodyText>
    </ContentBlock>
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
