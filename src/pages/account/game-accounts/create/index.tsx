import { BodyText } from '@atoms/BodyText'
import { ContentBlock } from '@atoms/ContentBlock'
import { Field } from '@atoms/Field'
import { FieldValidationMessage } from '@atoms/FieldValidationMessage'
import { Form } from '@atoms/Form'
import { FormButton } from '@atoms/FormButton/FormButton'
import { redirectTo } from '@helpers/window'
import { ChangeEvent, FormEvent, useState } from 'react'
import { hashPassword } from '@helpers/password'
import useAuthentication from '@hooks/useAuthentication'
import { UserIsLoggedIn } from '@helpers/users/users'
import { NotLoggedIn } from '@molecules/NotLoggedIn'
import { Spinner } from '@molecules/Spinner'
import { PageHeading } from '@atoms/PageHeading'
import { BannedText } from 'src/data/BannedText'
import { sanitizeRunescapePassword } from '@helpers/string/stringUtils'
import { sendApiRequest } from '@helpers/api/apiUtils'
import axios from 'axios'

const CreateGameAccount = () => {
  const [loading, setLoading] = useState(true)
  const [accountName, setAccountName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validationError, setValidationError] = useState('')
  const [submitDisabled, setSubmitDisabled] = useState(false)
  const user = useAuthentication(setLoading)

  const handleAccountNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAccountName(event.target.value)
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

  const handleGameAccountCreation = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitDisabled(true)

    // Check if name is empty
    if (accountName.replace(/_/g, ' ').trim().length < 1) {
      setSubmitDisabled(false)
      setValidationError('You cannot have an account name with only spaces.')
      return
    }

    // Only allow game account names with letters, numbers, underscores and spaces.
    const validUsernameMatches = accountName.match(/^[a-zA-Z0-9_ ]+$/g)
    if (!validUsernameMatches || !validUsernameMatches?.[0]) {
      setSubmitDisabled(false)
      setValidationError('Your account name can only have letters, numbers, underscores and spaces.')
      return
    }

    // Look for any bad or undesired words in names
    if (BannedText.some(text => accountName.toLowerCase().includes(text))) {
      setSubmitDisabled(false)
      setValidationError('Your account name has been determined to be offensive or misleading. Please try another one.')
      return
    }

    // Replace underscores with spaces in username. RSC+ signup does this.
    // Underscores are translated as spaces on login, but the account name cannot have underscores in the database.
    const sanitizedAccountName = accountName.replace(/_/g, ' ').trim()

    // Confirm passwords match
    if (password != confirmPassword) {
      setSubmitDisabled(false)
      setValidationError('Passwords do not match.')
      return
    }

    // Fix password so RSC recognizes it
    const fixedPassword = sanitizeRunescapePassword(password)

    // Hash password
    const { hashedPassword } = hashPassword(fixedPassword, true)

    axios.get('https://api.ipify.org/?format=json').then(response => {
      // Create account
      sendApiRequest('POST', '/api/createPlayerRecord', {
        userId: user.id,
        accountName: sanitizedAccountName,
        password: hashedPassword,
        websiteAccountId: user?.id,
        userIp: response?.data?.ip,
      })
        .then(response => {
          if (typeof response?.data === 'number') {
            const playerId = response?.data

            // Now we need to create the other records. New accounts are not playable without these.
            sendApiRequest('POST', '/api/createPlayerSkillRecords', {
              userId: user.id,
              playerId,
            })
              .then(response => {
                if (typeof response?.data === 'number') {
                  redirectTo(`/account/game-accounts/create/success?accountName=${accountName}`)
                }
              })
              .catch((error: { response: { data: string } }) => {
                setSubmitDisabled(false)
                setValidationError(error.response.data)
              })
          }
        })
        .catch((error: { response: { data: string } }) => {
          setSubmitDisabled(false)
          setValidationError(error.response.data)
        })
    })
  }

  if (loading) {
    return <Spinner />
  }

  if (process.env.NEXT_PUBLIC_GAME_ACCOUNTS_DISABLE_CREATION === 'true') {
    return (
      <ContentBlock>
        <PageHeading>Temporarily Disabled</PageHeading>
        <BodyText variant='body' textAlign='center'>
          Game account creations are temporarily disabled until further notice.
        </BodyText>
      </ContentBlock>
    )
  }

  if (!UserIsLoggedIn(user)) {
    return <NotLoggedIn />
  }

  return (
    <ContentBlock>
      <PageHeading>Create Game Account</PageHeading>
      <BodyText variant='body'>
        Game account names must be 12 characters or less. You are allowed spaces within your name, but any spaces at the
        start or end of your name will be removed upon account creation.
      </BodyText>
      <Form onSubmit={handleGameAccountCreation}>
        <Field
          required
          id='account-name'
          label='Account Name'
          type='text'
          variant='standard'
          onChange={handleAccountNameChange}
          inputProps={{ maxLength: 12 }}
        />
        <Field
          required
          id='password'
          label='Password'
          type='password'
          variant='standard'
          onChange={handlePasswordChange}
          inputProps={{ maxLength: 20 }}
        />
        <Field
          required
          id='confirmPassword'
          label='Confirm Password'
          type='password'
          variant='standard'
          onChange={handleConfirmPasswordChange}
          inputProps={{ maxLength: 20 }}
        />
        <FieldValidationMessage>{validationError}</FieldValidationMessage>
        <FormButton variant='contained' type='submit' disabled={submitDisabled}>
          Submit
        </FormButton>
      </Form>
    </ContentBlock>
  )
}

export default CreateGameAccount
