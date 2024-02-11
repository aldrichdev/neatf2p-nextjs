import { FormEvent, ChangeEvent, useState } from 'react'
import { ContentBlock } from '@atoms/ContentBlock'
import { Form } from '@atoms/Form'
import { BodyText } from '@atoms/BodyText'
import { InlineLink } from '@atoms/InlineLink'
import { Field } from '@atoms/Field'
import { FieldValidationError } from '@atoms/FieldValidationError'
import bcrypt from 'bcryptjs'
import axios from 'axios'
import { User } from '@globalTypes/User'
import { UserIdentityInfo } from '@globalTypes/Database/Users/UserIdentityInfo'
import useAuthentication from '@hooks/useAuthentication'
import { redirectTo } from '@helpers/window'
import { UserExists } from '@helpers/users/users'
import { FormButton } from '@atoms/FormButton/FormButton'
import { AlreadyLoggedIn } from '@molecules/AlreadyLoggedIn'
import { Spinner } from '@molecules/Spinner'
import { PageHeading } from '@atoms/PageHeading'

const CreateAccountPage = () => {
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validationError, setValidationError] = useState('')
  const [existingUsernames, setExistingUsernames] = useState<string[]>([])
  const [existingEmailAddresses, setExistingEmailAddresses] = useState<string[]>([])
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

  const handleAccountCreation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Confirm passwords match
    if (password != confirmPassword) {
      setValidationError('Passwords do not match.')
      return
    }

    // Check if username or email exists
    if (existingEmailAddresses.includes(email) || existingUsernames.includes(username)) {
      setValidationError('Email or username already exists.')
      return
    }

    // Hash password
    const passwordSalt = bcrypt.genSaltSync()
    const hashedPassword = bcrypt.hashSync(password, passwordSalt)

    const now = new Date()

    // Create account
    axios
      .post('/api/createUserAccount', {
        email,
        username,
        password: hashedPassword,
        passwordSalt,
        currentDate: now,
      })
      .then(response => {
        if (typeof response?.data === 'string') {
          const user: User = {
            id: response?.data,
            emailAddress: email,
            username,
            isAdmin: false,
            lastLogin: now,
          }

          // Log in the new user.
          axios
            .post('/api/ironLogin', { ...user })
            .then(response => {
              if (response?.status !== 200) {
                setValidationError(
                  `An error occurred logging you into the new account: HTTP ${response?.status}: ${response?.statusText}.`,
                )
              } else {
                // Redirect them to a page that shows they are logged in.
                redirectTo('/account/create/success')
              }
            })
            .catch((error: { response: { data: string } }) => {
              setValidationError(`An error occurred logging you into the new account: ${error?.response?.data}`)
            })
        }
      })
      .catch((error: { response: { data: string } }) => {
        setValidationError(error.response.data)
      })
  }

  const fetchExistingUserInfo = () => {
    axios
      .get(`/api/getExistingUserInfo`)
      .then(response => {
        const allEmailAddresses = response?.data?.map((info: UserIdentityInfo) => info.emailAddress)
        setExistingEmailAddresses(allEmailAddresses)

        const allUsernames = response?.data?.map((info: UserIdentityInfo) => info.username)
        setExistingUsernames(allUsernames)
      })
      .catch((error: string) => error)
  }

  if (loading) {
    return <Spinner />
  }

  if (existingEmailAddresses?.length < 1 || existingUsernames?.length < 1) {
    fetchExistingUserInfo()
  }

  if (UserExists(user)) {
    // Logged-in users should not see this page
    return (
      <AlreadyLoggedIn message='You already have an account! If you wish to create a new one, please log out first.' />
    )
  }

  return (
    <ContentBlock>
      <PageHeading>Create Account</PageHeading>
      <BodyText variant='body' textAlign='left'>
        By creating a website account, you can add or rename game accounts, update passwords, and some other nifty
        things.
      </BodyText>
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
        />
        <Field
          required
          id='password'
          label='Password'
          type='password'
          variant='standard'
          onChange={handlePasswordChange}
        />
        <Field
          required
          id='confirmPassword'
          label='Confirm Password'
          type='password'
          variant='standard'
          onChange={handleConfirmPasswordChange}
        />
        <FieldValidationError>{validationError}</FieldValidationError>
        <FormButton variant='contained' type='submit' disabled={!!validationError}>
          Submit
        </FormButton>
      </Form>
      <BodyText variant='body' topMargin={40} textAlign='left'>
        <span>Already have an account?</span>
        <InlineLink href='/account/login'>Log in.</InlineLink>
      </BodyText>
    </ContentBlock>
  )
}

export default CreateAccountPage
