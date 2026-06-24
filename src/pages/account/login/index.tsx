import { FormEvent, useState, ChangeEvent } from 'react'
import { Form } from '@atoms/Form'
import { BodyText } from '@atoms/BodyText'
import { FieldValidationMessage } from '@atoms/FieldValidationMessage'
import { User } from '@globalTypes/User'
import { redirectTo } from '@utils/window'
import { AlreadyLoggedIn } from '@molecules/AlreadyLoggedIn'
import { UserExists, UserIsLoggedIn } from '@utils/users/users'
import { PageHeading } from '@atoms/PageHeading'
import { sendApiRequest } from '@utils/api/apiUtils'
import axios from 'axios'
import { renderHead } from '@utils/renderUtils'
import usePasswordHashing from '@hooks/usePasswordHashing'
import { NullUser } from '@models/NullUser'
import { sessionOptions } from '@models/session'
import { getIronSession } from 'iron-session'
import { GetServerSideProps } from 'next'
import { Input } from '@ui/input'
import { sharedStyles } from '../../../consts/styles/shared'
import { StandardLink } from '@atoms/StandardLink'
import { Button } from '@ui/button'
import { cn } from '@utils/cn'

type AccountLoginPageProps = {
  user: User
}

const AccountLoginPage = ({ user }: AccountLoginPageProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [validationError, setValidationError] = useState('')
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const userIsLoggedIn = UserIsLoggedIn(user)
  const { passwordValid } = usePasswordHashing()

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
    setValidationError('')
  }

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
    setValidationError('')
  }

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setButtonDisabled(true)

    sendApiRequest('GET', `/api/getUser?email=${encodeURIComponent(email)}`)
      .then(async response => {
        const result = response?.data

        // First thing would be to confirm the user exists.
        if (!UserExists(result)) {
          setButtonDisabled(false)
          setValidationError('Email does not exist.')
          return
        }

        // Next would be to make sure the password is right
        const handleHashingException = (error: Error) => {
          setButtonDisabled(false)
          setValidationError(`An error occurred. ${error.message}. Please notify the admin.`)
          return
        }

        const passwordIsCorrect = passwordValid(result, password, handleHashingException)

        if (!passwordIsCorrect) {
          setButtonDisabled(false)
          setValidationError('Password is incorrect.')
          return
        }

        // If we get this far, it's a match. Log them in and redirect to homepage
        const user: User = { ...result, isAdmin: Boolean(result?.isAdmin || 0) }

        sendApiRequest('POST', '/api/ironLogin', { ...user })
          .then(response => {
            if (response?.status !== 200) {
              setButtonDisabled(false)
              setValidationError('An error occurred logging you in.')
            } else {
              // We will now log IPs for website account logins, for security.
              axios.get('https://api.ipify.org/?format=json').then(response => {
                // Update the user's session, ip, and lastLogin in the database.
                sendApiRequest('POST', '/api/updateWebsiteUserSession', {
                  userId: user.id,
                  userIp: response?.data?.ip,
                })
                  .then(() => {
                    // Take user to homepage. `AccountWidget` will indicate login was successful.
                    redirectTo('/')
                  })
                  .catch((error: { response: { data: string } }) => {
                    setButtonDisabled(false)
                    setValidationError(`Couldn't update user session: ${error?.response?.data}`)
                  })
              })
            }
          })
          .catch((error: { response: { data: string } }) => {
            setButtonDisabled(false)
            setValidationError(`An error occurred logging you in: ${error?.response?.data}`)
          })
      })
      .catch((error: string) => error)
  }

  return (
    <>
      {renderHead('Login', 'Log into your Neat F2P website account here.')}
      {userIsLoggedIn ? (
        <AlreadyLoggedIn />
      ) : (
        <div className={cn(sharedStyles.defaultContainer, 'text-lg')}>
          <PageHeading>Login</PageHeading>
          <BodyText bodyTextAlign='left'>Log in to your website account below.</BodyText>
          <Form onSubmit={handleLogin}>
            <Input required id='email' placeholder='Email' onChange={handleEmailChange} autoComplete='username' />
            <Input
              required
              id='password'
              placeholder='Password'
              type='password'
              onChange={handlePasswordChange}
              autoComplete='current-password'
            />
            {validationError && <FieldValidationMessage>{validationError}</FieldValidationMessage>}
            <BodyText bodyTextAlign='left' className='basis-full text-left text-base'>
              <StandardLink href='/account/login/forgot-password' hoverUnderline>
                Forgot Password?
              </StandardLink>
            </BodyText>
            <Button type='submit' disabled={buttonDisabled}>
              Log In
            </Button>
          </Form>
          <BodyText bodyTextAlign='left' className='basis-full'>
            <span>New around here? </span>
            <StandardLink href='/account/create'>Create a site account</StandardLink>
          </BodyText>
        </div>
      )}
    </>
  )
}

export default AccountLoginPage

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getIronSession(req, res, sessionOptions)
  const user: User = session?.user || NullUser

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  }
}
