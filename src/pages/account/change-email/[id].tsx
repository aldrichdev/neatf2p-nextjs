import { BodyText } from '@atoms/BodyText'
import { ContentBlock } from '@atoms/ContentBlock'
import { PageHeading } from '@atoms/PageHeading'
import { sendApiRequest } from '@helpers/api/apiUtils'
import { Spinner } from '@molecules/Spinner'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const ChangeEmailByIdPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { query } = useRouter()
  const accountId = query?.id
  const newEmail = query?.email

  useEffect(() => {
    if (!accountId || !newEmail) return

    sendApiRequest('POST', '/api/updateWebsiteUserEmailAddress', {
      userId: accountId,
      newEmail,
    }).then(() => {
      setIsLoading(false)
    })
  }, [accountId, newEmail])

  if (isLoading) {
    return <Spinner />
  }

  return (
    <ContentBlock>
      <PageHeading>Update Complete</PageHeading>
      <BodyText variant='body' textAlign='center'>
        Your email has been updated. You can go back to your <Link href='/account'>account</Link> page.
      </BodyText>
    </ContentBlock>
  )
}

export default ChangeEmailByIdPage
