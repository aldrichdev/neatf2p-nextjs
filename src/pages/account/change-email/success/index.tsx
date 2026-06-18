import { BodyText } from '@atoms/BodyText'
import { PageHeading } from '@atoms/PageHeading'
import { useRouter } from 'next/router'
import { renderHead } from '@utils/renderUtils'
import { sharedStyles } from '@consts/styles/shared'
import { StandardLink } from '@atoms/StandardLink'

const ChangeEmailSuccessPage = () => {
  const router = useRouter()
  const { query } = router
  const newEmail = query.email

  return (
    <>
      {renderHead('Success')}
      <div className={sharedStyles.defaultContainer}>
        <PageHeading>Check Your New Email</PageHeading>
        <BodyText bodyTextAlign='center'>
          We just sent an email to <span className='font-mono'>{newEmail}</span>. There should be a link in it to
          complete the process. Your email is not updated until you click the link.
        </BodyText>
        <BodyText bodyTextAlign='center'>
          If you would like to try again, return to the{' '}
          <StandardLink href='/account/change-email'>Change Email</StandardLink> page.
        </BodyText>
      </div>
    </>
  )
}

export default ChangeEmailSuccessPage
