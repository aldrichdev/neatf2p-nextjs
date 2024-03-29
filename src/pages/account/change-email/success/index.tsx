import { ContentBlock } from '@atoms/ContentBlock'
import { BodyText } from '@atoms/BodyText'
import { PageHeading } from '@atoms/PageHeading'
import { useRouter } from 'next/router'
import Link from 'next/link'

const ChangeEmailSuccessPage = () => {
  const router = useRouter()
  const { query } = router
  const newEmail = query.email

  return (
    <ContentBlock>
      <PageHeading>Check Your New Email</PageHeading>
      <BodyText variant='body' textAlign='center'>
        We just sent an email to {newEmail}. There should be a link in it to complete the process. Your email is not
        updated until you click the link.
      </BodyText>
      <BodyText variant='body' textAlign='center'>
        If you would like to try again, return to the <Link href='/account/change-email'>Change Email</Link> page.
      </BodyText>
    </ContentBlock>
  )
}

export default ChangeEmailSuccessPage
