import { FormEvent, ChangeEvent, useState } from 'react'
import { ContentBlock } from '@atoms/ContentBlock'
import { Form } from '@atoms/Form'
import { BodyText } from '@atoms/BodyText'
import { InlineLink } from '@atoms/InlineLink'
import { Field } from '@atoms/Field'
import { FieldValidationMessage } from '@atoms/FieldValidationMessage'
import bcrypt from 'bcryptjs'
import { User } from '@globalTypes/User'
import useAuthentication from '@hooks/useAuthentication'
import { redirectTo } from '@helpers/window'
import { UserExists } from '@helpers/users/users'
import { FormButton } from '@atoms/FormButton/FormButton'
import { AlreadyLoggedIn } from '@molecules/AlreadyLoggedIn'
import { Spinner } from '@molecules/Spinner'
import { PageHeading } from '@atoms/PageHeading'
import { Callout } from '@atoms/Callout'
import { sendApiRequest } from '@helpers/api/apiUtils'
import axios from 'axios'
import { renderHead } from '@helpers/renderUtils'
import { RulesAcceptanceCheckbox } from '@molecules/RulesAcceptanceCheckbox'

const CreateAccountPage = () => {
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [rulesAgreedTo, setRulesAgreedTo] = useState<boolean>()
  const [validationError, setValidationError] = useState('')
  const [submitDisabled, setSubmitDisabled] = useState(false)
  const user = useAuthentication(setLoading)

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
    setValidationError('')
  }

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value)
    setValidationError('')
  }

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
    setValidationError('')
  }

  const handleConfirmPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value)
    setValidationError('')
  }

  const handleRulesCheck = () => {
    setRulesAgreedTo(!rulesAgreedTo)
  }

  const handleAccountCreation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitDisabled(true)

    // Confirm passwords match
    if (password != confirmPassword) {
      setSubmitDisabled(false)
      setValidationError('Passwords do not match.')
      return
    }

    // Hash password
    const passwordSalt = bcrypt.genSaltSync()
    const hashedPassword = bcrypt.hashSync(password, passwordSalt)

    const now = new Date()

    // Create account
    sendApiRequest('POST', '/api/createUserAccount', {
      email,
      username,
      password: hashedPassword,
      passwordSalt,
      currentDate: now,
    })
      .then(response => {
        if (response?.status !== 200) {
          setSubmitDisabled(false)
          setValidationError(response?.data)
        } else if (typeof response?.data === 'string') {
          const user: User = {
            id: response?.data,
            emailAddress: email,
            username,
            isAdmin: false,
            lastLogin: now,
            dateModified: now.toString(),
          }

          // Log in the new user.
          sendApiRequest('POST', '/api/ironLogin', { ...user })
            .then(response => {
              if (response?.status !== 200) {
                setSubmitDisabled(false)
                setValidationError(
                  `An error occurred logging you into the new account: HTTP ${response?.status}: ${response?.statusText}.`,
                )
              } else {
                // Update the user's session, login IP and lastLogin in the database.
                axios.get('https://api.ipify.org/?format=json').then(response => {
                  sendApiRequest('POST', '/api/updateWebsiteUserSession', {
                    userId: user.id,
                    userIp: response?.data?.ip,
                  })
                    .then(() => {
                      // Redirect them to a page that shows they are logged in.
                      redirectTo('/account/create/success')
                    })
                    .catch((error: { response: { data: string } }) => {
                      setSubmitDisabled(false)
                      setValidationError(`Couldn't update user session: ${error?.response?.data}`)
                    })
                })
              }
            })
            .catch((error: { response: { data: string } }) => {
              setSubmitDisabled(false)
              setValidationError(`An error occurred logging you into the new account: ${error?.response?.data}`)
            })
        }
      })
      .catch((error: { response: { data: string } }) => {
        setSubmitDisabled(false)

        // An exception can happen if the email address or username are taken.
        // We need to check if there are no rows affected, because this means the query didn't insert anything.
        if (error.response.data.toLowerCase().includes('no rows affected')) {
          setValidationError('The email address or username you entered is already taken. Please choose another one.')
        } else {
          setValidationError(error.response.data)
        }
      })
  }

  if (loading) {
    return (
      <>
        {renderHead('Register')}
        <Spinner />
      </>
    )
  }

  if (UserExists(user)) {
    // Logged-in users should not see this page
    return (
      <AlreadyLoggedIn message='You already have an account! If you wish to create a new one, please log out first.' />
    )
  }

  return (
    <>
      {renderHead('Register')}
      <ContentBlock>
        <PageHeading>Create Account</PageHeading>
        <BodyText variant='body' bodyTextAlign='left'>
          By creating a website account, you can add or rename game accounts, update passwords, and some other nifty
          things.
        </BodyText>
        <Callout variant='warning'>
          <strong>Note:</strong> The account you are creating on this page is NOT a game account, it is an account for
          the website. Once you log into the site, you will be able to create game accounts that you can log into the
          server with.
        </Callout>
        <Form onSubmit={handleAccountCreation}>
          <Field
            required
            id='email'
            label='Email'
            type='email'
            variant='standard'
            onChange={handleEmailChange}
            inputProps={{ maxLength: 100 }}
          />
          <Field
            required
            id='username'
            label='Username'
            variant='standard'
            onChange={handleUsernameChange}
            inputProps={{ maxLength: 100 }}
            autoComplete='username'
          />
          <Field
            required
            id='password'
            label='Password'
            type='password'
            variant='standard'
            onChange={handlePasswordChange}
            autoComplete='new-password'
          />
          <Field
            required
            id='confirmPassword'
            label='Confirm Password'
            type='password'
            variant='standard'
            onChange={handleConfirmPasswordChange}
            autoComplete='new-password'
          />
          <RulesAcceptanceCheckbox onChange={handleRulesCheck} />
          {validationError && <FieldValidationMessage>{validationError}</FieldValidationMessage>}
          <FormButton variant='contained' type='submit' disabled={submitDisabled}>
            Submit
          </FormButton>
        </Form>
        <BodyText variant='body' topMargin={40} bodyTextAlign='left'>
          <span>Already have an account?</span>
          <InlineLink href='/account/login'>Log in.</InlineLink>
        </BodyText>
      </ContentBlock>
    </>
  )
}

export default CreateAccountPage
