import { FormEvent, useState, ChangeEvent } from 'react'
import { styled } from '@mui/material/styles'
import { css } from '@mui/system'
import { ContentBlock } from '@atoms/ContentBlock'
import { Form } from '@atoms/Form'
import { BodyText } from '@atoms/BodyText'
import { Field } from '@atoms/Field'
import { InlineLink } from '@atoms/InlineLink'
import { FieldValidationMessage } from '@atoms/FieldValidationMessage'
import axios from 'axios'
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
  const [usernameOrEmail, setUsernameOrEmail] = useState('')
  const [password, setPassword] = useState('')
  const [validationError, setValidationError] = useState('')
  const user = useAuthentication(setLoading)
  const userIsLoggedIn = UserIsLoggedIn(user)

  if (loading) {
    return <Spinner />
  }

  if (userIsLoggedIn) {
    return <AlreadyLoggedIn />
  }

  const handleUsernameOrEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsernameOrEmail(event.target.value)
  }

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    axios
      .get(`/api/getUser?user=${usernameOrEmail}`)
      .then(async response => {
        const result = response?.data

        // First thing would be to confirm the user exists.
        if (!UserExists(result)) {
          setValidationError('Username or email does not exist.')
          return
        }

        // Next would be to make sure the password is right
        const hashedPassword = result?.password
        const passwordSalt = result?.passwordSalt
        let currentPasswordHashed = ''

        try {
          currentPasswordHashed = bcrypt.hashSync(password, passwordSalt)
        } catch (e) {
          setValidationError(`An error occurred. ${e}. Please notify the admin.`)
          return
        }

        if (hashedPassword !== currentPasswordHashed) {
          setValidationError('Password is incorrect.')
          return
        }

        // If we get this far, it's a match. Log them in and redirect to homepage
        const user: User = { ...result }

        axios
          .post('/api/ironLogin', { ...user })
          .then(response => {
            if (response?.status !== 200) {
              setValidationError('An error occurred logging you in.')
            }
          })
          .catch((error: { response: { data: string } }) => {
            setValidationError(`An error occurred logging you in: ${error?.response?.data}`)
          })

        // Update the user's lastLogin in the database.
        axios
          .post('/api/updateLastLogin', {
            userId: user.id,
          })
          .then(() => {
            // Take user to homepage. `AccountWidget` will indicate login was successful.
            redirectTo('/')
          })
          .catch((error: { response: { data: string } }) => {
            setValidationError(`Couldn't set last login date: ${error?.response?.data}`)
          })
      })
      .catch((error: string) => error)
  }

  return (
    <ContentBlock>
      <PageHeading>Login</PageHeading>
      <BodyText variant='body' textAlign='left'>
        Log in to your website account below.
      </BodyText>
      <Form onSubmit={handleLogin}>
        <Field
          required
          id='usernameOrEmail'
          label='Username or Email'
          variant='standard'
          onChange={handleUsernameOrEmailChange}
        />
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
        <FormButton variant='contained' type='submit'>
          Log In
        </FormButton>
      </Form>
      <BodyText variant='body' topMargin={40} textAlign='left'>
        <span>New around here?</span>
        <InlineLink href='/account/create'>Create a site account.</InlineLink>
      </BodyText>
    </ContentBlock>
  )
}

export default AccountLoginPage
