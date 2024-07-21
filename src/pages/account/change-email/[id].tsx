import { BodyText } from '@atoms/BodyText'
import { ContentBlock } from '@atoms/ContentBlock'
import { PageHeading } from '@atoms/PageHeading'
import { handleForbiddenRedirect, sendApiRequest } from '@helpers/api/apiUtils'
import { renderHead } from '@helpers/renderUtils'
import useAuthentication from '@hooks/useAuthentication'
import { Spinner } from '@molecules/Spinner'
import { AxiosError } from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import emailjs from '@emailjs/browser'

const ChangeEmailByIdPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { query } = useRouter()
  const accountId = query?.id
  const newEmail = query?.email
  const user = useAuthentication()

  useEffect(() => {
    if (!accountId || !newEmail) return

    sendApiRequest('POST', '/api/updateWebsiteUserEmailAddress', {
      userId: accountId,
      newEmail,
    })
      .then(() => {
        // Send an email to the old address to let them know it changed
        emailjs
          .send('service_6xpikef', 'template_6rz807l', {
            recipient: user.emailAddress,
            newEmail,
          })
          .then(() => {
            setIsLoading(false)
          })
      })
      .catch((error: AxiosError<string>) => {
        handleForbiddenRedirect(error)
      })
  }, [accountId, newEmail, user.id, user.emailAddress])

  if (isLoading) {
    return (
      <>
        {renderHead('Change Email Address')}
        <Spinner />
      </>
    )
  }

  return (
    <>
      {renderHead('Change Email Address')}
      <ContentBlock>
        <PageHeading>Update Complete</PageHeading>
        <BodyText variant='body' bodyTextAlign='center'>
          Your email has been updated. You can go back to your <Link href='/account'>account</Link> page.
        </BodyText>
      </ContentBlock>
    </>
  )
}

export default ChangeEmailByIdPage
