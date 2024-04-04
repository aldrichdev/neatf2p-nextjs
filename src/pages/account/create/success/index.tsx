import { ContentBlock } from '@atoms/ContentBlock'
import { BodyText } from '@atoms/BodyText'
import { InlineLink } from '@atoms/InlineLink'
import useAuthentication from '@hooks/useAuthentication'
import { Spinner } from '@molecules/Spinner'
import { useState } from 'react'
import { PageHeading } from '@atoms/PageHeading'

const CreateAccountSuccessPage = () => {
  const [loading, setLoading] = useState(true)
  const user = useAuthentication(setLoading)

  if (loading) {
    return <Spinner />
  }

  if (user?.id === 'NULL') {
    // Something went wrong...
    return (
      <ContentBlock>
        <PageHeading>Oops...</PageHeading>
        <BodyText variant='body' textAlign='center'>
          Something went wrong... you are now {user?.username}! Tell all your friends, then try logging in again, or
          notify the admin
        </BodyText>
      </ContentBlock>
    )
  }

  return (
    <ContentBlock>
      <PageHeading>Success</PageHeading>
      <BodyText variant='body' textAlign='center'>
        Your account, <strong>{user?.username}</strong>, has been created! You can now view your
        <InlineLink href='/account'>Account page</InlineLink>.
      </BodyText>
    </ContentBlock>
  )
}

export default CreateAccountSuccessPage
