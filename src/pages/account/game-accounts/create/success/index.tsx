import { ContentBlock } from '@atoms/ContentBlock'
import { BodyText } from '@atoms/BodyText'
import { InlineLink } from '@atoms/InlineLink'
import { useRouter } from 'next/router'
import useAuthentication from '@hooks/useAuthentication'
import { UserIsLoggedIn } from '@helpers/users/users'
import { NotLoggedIn } from '@molecules/NotLoggedIn'
import { useState } from 'react'
import { Spinner } from '@molecules/Spinner'
import { PageHeading } from '@atoms/PageHeading'
import { renderHead } from '@helpers/renderUtils'

const CreateAccountSuccessPage = () => {
  const [loading, setLoading] = useState(true)
  const { query } = useRouter()
  const user = useAuthentication(setLoading)
  const accountName = query['accountName']

  if (loading) {
    return <Spinner />
  }

  if (!UserIsLoggedIn(user)) {
    return <NotLoggedIn />
  }

  if (!accountName || accountName?.length < 1) {
    // Something went wrong...
    return (
      <>
        {renderHead('Oops...')}
        <ContentBlock>
          <PageHeading>Oops...</PageHeading>
          <BodyText variant='body' bodyTextAlign='center'>
            Something went wrong... your game account name is empty. Please report this to the admin.
          </BodyText>
        </ContentBlock>
      </>
    )
  }

  return (
    <>
      {renderHead('Success')}
      <ContentBlock>
        <PageHeading>Success</PageHeading>
        <BodyText variant='body' bodyTextAlign='center'>
          Your game account, <strong>{accountName}</strong>, has been created. You can now log in.
        </BodyText>
        <BodyText variant='body' bodyTextAlign='center'>
          You may return to the
          <InlineLink href='/account/game-accounts'>game accounts page</InlineLink>.
        </BodyText>
      </ContentBlock>
    </>
  )
}

export default CreateAccountSuccessPage
