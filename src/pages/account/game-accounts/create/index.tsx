import { BodyText } from '@atoms/BodyText'
import { ContentBlock } from '@atoms/ContentBlock'
import { Field } from '@atoms/Field'
import { FieldValidationMessage } from '@atoms/FieldValidationMessage'
import { Form } from '@atoms/Form'
import { FormButton } from '@atoms/FormButton/FormButton'
import { PlayerDataRow } from '@globalTypes/Database/PlayerDataRow'
import { redirectTo } from '@helpers/window'
import axios from 'axios'
import { ChangeEvent, FormEvent, useState } from 'react'
import { hashPassword } from '@helpers/password'
import useAuthentication from '@hooks/useAuthentication'
import { UserIsLoggedIn } from '@helpers/users/users'
import { NotLoggedIn } from '@molecules/NotLoggedIn'
import { Spinner } from '@molecules/Spinner'
import { gameAccountPasswordIsValid } from '@helpers/string/stringUtils'
import { PageHeading } from '@atoms/PageHeading'
import { BannedText } from 'src/data/BannedText'

const CreateGameAccount = () => {
  const [loading, setLoading] = useState(true)
  const [accountName, setAccountName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validationError, setValidationError] = useState('')
  const [currentAccountNames, setCurrentAccountNames] = useState('')
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

    if (!gameAccountPasswordIsValid(password)) {
      setSubmitDisabled(false)
      setValidationError('Game account passwords can only have letters, numbers and underscores.')
      return
    }

    // Check if account name already exists. Check with both values in lower case.
    if (currentAccountNames.includes(sanitizedAccountName.toLowerCase())) {
      setSubmitDisabled(false)
      setValidationError('Account name already exists.')
      return
    }

    // Hash password
    const { hashedPassword } = hashPassword(password, true)

    axios.get('https://api.ipify.org/?format=json').then(response => {
      // Create account
      axios
        .post('/api/createPlayerRecord', {
          accountName: sanitizedAccountName,
          password: hashedPassword,
          websiteAccountId: user?.id,
          userIp: response?.data?.ip,
        })
        .then(response => {
          if (typeof response?.data === 'number') {
            const playerId = response?.data

            // Now we need to create the other records. New accounts are not playable without these.
            axios
              .post('/api/createPlayerSkillRecords', {
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

  const fetchCurrentAccountNames = () => {
    axios
      .get(`/api/getCurrentGameAccountNames`)
      .then(response => {
        const allAccountNames = response?.data?.map((info: PlayerDataRow) => info.username.toLowerCase())
        setCurrentAccountNames(allAccountNames)
      })
      .catch((error: string) => error)
  }

  if (loading) {
    return <Spinner />
  }

  if (true) {
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

  if (currentAccountNames?.length < 1) {
    fetchCurrentAccountNames()
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
        />
        <Field
          required
          id='confirmPassword'
          label='Confirm Password'
          type='password'
          variant='standard'
          onChange={handleConfirmPasswordChange}
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
