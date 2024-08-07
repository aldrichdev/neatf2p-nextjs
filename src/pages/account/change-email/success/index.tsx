import { ContentBlock } from '@atoms/ContentBlock'
import { BodyText } from '@atoms/BodyText'
import { PageHeading } from '@atoms/PageHeading'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { renderHead } from '@helpers/renderUtils'

const ChangeEmailSuccessPage = () => {
  const router = useRouter()
  const { query } = router
  const newEmail = query.email

  return (
    <>
      {renderHead('Success')}
      <ContentBlock>
        <PageHeading>Check Your New Email</PageHeading>
        <BodyText variant='body' bodyTextAlign='center'>
          We just sent an email to {newEmail}. There should be a link in it to complete the process. Your email is not
          updated until you click the link.
        </BodyText>
        <BodyText variant='body' bodyTextAlign='center'>
          If you would like to try again, return to the <Link href='/account/change-email'>Change Email</Link> page.
        </BodyText>
      </ContentBlock>
    </>
  )
}

export default ChangeEmailSuccessPage
