import { FormEvent, useState, ChangeEvent } from 'react'
import { sharedStyles } from '@consts/styles/shared'
import { Form } from '@atoms/Form'
import { BodyText } from '@atoms/BodyText'
import { redirectTo } from '@utils/window'
import { UserExists, UserIsLoggedIn } from '@utils/users/users'
import { AlreadyLoggedIn } from '@molecules/AlreadyLoggedIn'
import { PageHeading } from '@atoms/PageHeading'
import { sendApiRequest } from '@utils/api/apiUtils'
import { renderHead } from '@utils/renderUtils'
import { User } from '@globalTypes/User'
import { NullUser } from '@models/NullUser'
import { sessionOptions } from '@models/session'
import { getIronSession } from 'iron-session'
import { GetServerSideProps } from 'next'
import { DiscordInviteLink } from '@consts/discord'
import { StandardLink } from '@atoms/StandardLink'
import { Input } from '@ui/input'
import { Button } from '@ui/button'

type ForgotPasswordPageProps = {
  user: User
}

const ForgotPasswordPage = ({ user }: ForgotPasswordPageProps) => {
  const [email, setEmail] = useState('')
  const userIsLoggedIn = UserIsLoggedIn(user)

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handleRequest = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    sendApiRequest('GET', `/api/getUser?email=${email}`)
      .then(response => {
        const result = response?.data
        const userExists = UserExists(result)

        if (userExists) {
          // Persist reset token to user and reset email.
          sendApiRequest('POST', '/api/addResetTokenAndSendEmail', {
            userId: result.id,
            recipientEmail: result.emailAddress,
          }).catch(error => {
            console.error(error)
          })
        }

        // Whether or not the user exists, redirect to success page.
        // We will not tell the user trying to reset whether the account exists.
        redirectTo('/account/login/forgot-password/success')
      })
      .catch((error: string) => error)
  }

  return (
    <>
      {renderHead('Forgot Password', 'If you forgot your website account password, you can reset it here.')}
      {userIsLoggedIn ? (
        <AlreadyLoggedIn />
      ) : (
        <div className={sharedStyles.defaultContainer}>
          <PageHeading className='mb-2'>Forgot Password</PageHeading>
          <BodyText bodyTextAlign='left'>
            Forgotten your password? Enter your email below and we will send you a password reset link. If you have
            forgotten your email as well, please contact an administrator in our{' '}
            <StandardLink href={DiscordInviteLink} target='_blank'>
              Discord server
            </StandardLink>
            .
          </BodyText>
          <Form onSubmit={handleRequest}>
            <Input required id='email' placeholder='Email' onChange={handleEmailChange} autoComplete='username' />
            <Button type='submit'>Submit</Button>
          </Form>
          <BodyText bodyTextAlign='left'>
            <span>Or, if you remember it, </span>
            <StandardLink href='/account/login'>try logging in now.</StandardLink>
          </BodyText>
        </div>
      )}
    </>
  )
}

export default ForgotPasswordPage

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getIronSession(req, res, sessionOptions)
  const user: User = session?.user || NullUser

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  }
}
