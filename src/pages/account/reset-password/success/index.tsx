import { ContentBlock } from '@atoms/ContentBlock'
import { BodyText } from '@atoms/BodyText'
import { InlineLink } from '@atoms/InlineLink'
import useAuthentication from '@hooks/useAuthentication'
import { UserIsLoggedIn } from '@helpers/users/users'
import { PageHeading } from '@atoms/PageHeading'
import Head from 'next/head'
import { SharedBrowserTitle } from 'src/constants'

const ResetPasswordSuccessPage = () => {
  const user = useAuthentication()

  return (
    <>
      <Head>
        <title>Success | {SharedBrowserTitle}</title>
      </Head>
      <ContentBlock>
        <PageHeading>Reset Successful</PageHeading>
        <BodyText variant='body' textAlign='center'>
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
}

export default ResetPasswordSuccessPage
