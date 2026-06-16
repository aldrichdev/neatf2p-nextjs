import { BodyText } from '@atoms/BodyText'
import { PageHeading } from '@atoms/PageHeading'
import { StandardLink } from '@atoms/StandardLink'
import { sharedStyles } from '../../../consts/styles/shared'

type AlreadyLoggedInProps = {
  message?: JSX.Element | string
}

const AlreadyLoggedIn = (props: AlreadyLoggedInProps) => {
  const { message } = props

  return (
    <div className={sharedStyles.defaultContainer}>
      <PageHeading>Already Logged In</PageHeading>
      <BodyText bodyTextAlign='center'>
        {message || (
          <>
            You are already logged in. You can visit your <StandardLink href='/account'>Account page</StandardLink>.
          </>
        )}
      </BodyText>
    </div>
  )
}

export default AlreadyLoggedIn
