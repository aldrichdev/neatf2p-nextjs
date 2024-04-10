import { FormEvent, useState, ChangeEvent } from 'react'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'
import { ContentBlock } from '@atoms/ContentBlock'
import { Form } from '@atoms/Form'
import { BodyText } from '@atoms/BodyText'
import { Field } from '@atoms/Field'
import { InlineLink } from '@atoms/InlineLink'
import { FieldValidationMessage } from '@atoms/FieldValidationMessage'
import bcrypt from 'bcryptjs'
import { User } from '@globalTypes/User'
import useAuthentication from '@hooks/useAuthentication'
import { redirectTo } from '@helpers/window'
import { HoverUnderlineLink } from '@atoms/HoverUnderlineLink'
import { AlreadyLoggedIn } from '@molecules/AlreadyLoggedIn'
import { UserExists, UserIsLoggedIn } from '@helpers/users/users'
import { FormButton } from '@atoms/FormButton/FormButton'
import { Spinner } from '@molecules/Spinner'
import { PageHeading } from '@atoms/PageHeading'
import { sendApiRequest } from '@helpers/api/apiUtils'
import axios from 'axios'
import Head from 'next/head'

const ForgotPasswordBlock = styled(BodyText)(
  () => css`
    flex-basis: 100%;
    font-family: Source Sans Pro;
    font-size: 16px;
    text-align: left;
  `,
)

const ForgotPasswordLink = styled(HoverUnderlineLink)(
  () => css`
    color: black;
  `,
)

const AccountLoginPage = () => {
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [validationError, setValidationError] = useState('')
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const user = useAuthentication(setLoading)
  const userIsLoggedIn = UserIsLoggedIn(user)

  const renderHead = () => (
    <Head>
      <title>Login | Neat F2P :: Nostalgia Reborn | Runescape Classic F2P</title>
    </Head>
  )

  if (loading) {
    return (
      <>
        {renderHead()}
        <Spinner />
      </>
    )
  }

  if (userIsLoggedIn) {
    return <AlreadyLoggedIn />
  }

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setButtonDisabled(true)

    sendApiRequest('GET', `/api/getUser?email=${email}`)
      .then(async response => {
        const result = response?.data

        // First thing would be to confirm the user exists.
        if (!UserExists(result)) {
          setButtonDisabled(false)
          setValidationError('Email does not exist.')
          return
        }

        // Next would be to make sure the password is right
        const hashedPassword = result?.password
        const passwordSalt = result?.passwordSalt
        let currentPasswordHashed = ''

        try {
          currentPasswordHashed = bcrypt.hashSync(password, passwordSalt)
        } catch (e) {
          setButtonDisabled(false)
          setValidationError(`An error occurred. ${e}. Please notify the admin.`)
          return
        }

        if (hashedPassword !== currentPasswordHashed) {
          setButtonDisabled(false)
          setValidationError('Password is incorrect.')
          return
        }

        // If we get this far, it's a match. Log them in and redirect to homepage
        const user: User = { ...result }

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
      {renderHead()}
      <ContentBlock>
        <PageHeading>Login</PageHeading>
        <BodyText variant='body' textAlign='left'>
          Log in to your website account below.
        </BodyText>
        <Form onSubmit={handleLogin}>
          <Field required id='email' label='Email' variant='standard' onChange={handleEmailChange} />
          <Field
            required
            id='password'
            label='Password'
            type='password'
            variant='standard'
            onChange={handlePasswordChange}
          />
          <FieldValidationMessage>{validationError}</FieldValidationMessage>
          <ForgotPasswordBlock variant='body' topMargin={20} textAlign='left'>
            <ForgotPasswordLink href='/account/login/forgot-password'>Forgot Password?</ForgotPasswordLink>
          </ForgotPasswordBlock>
          <FormButton variant='contained' type='submit' disabled={buttonDisabled}>
            Log In
          </FormButton>
        </Form>
        <BodyText variant='body' topMargin={40} textAlign='left'>
          <span>New around here?</span>
          <InlineLink href='/account/create'>Create a site account.</InlineLink>
        </BodyText>
      </ContentBlock>
    </>
  )
}

export default AccountLoginPage
