import { BodyText } from '@atoms/BodyText'
import { ContentBlock } from '@atoms/ContentBlock'
import { Field } from '@atoms/Field'
import { FieldValidationError } from '@atoms/FieldValidationError'
import { Form } from '@atoms/Form'
import { FormButton } from '@atoms/FormButton/FormButton'
import { PlayerDataRow } from '@globalTypes/Database/PlayerDataRow'
import { redirectTo } from '@helpers/window'
import { Typography } from '@mui/material'
import axios from 'axios'
import { ChangeEvent, FormEvent, useState } from 'react'
import { hashPassword } from '@helpers/password'
import useAuthentication from '@hooks/useAuthentication'
import { UserIsLoggedIn } from '@helpers/users/users'
import { NotLoggedIn } from '@molecules/NotLoggedIn'

const CreateGameAccount = () => {
  const user = useAuthentication()
  const [accountName, setAccountName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validationError, setValidationError] = useState('')
  const [currentAccountNames, setCurrentAccountNames] = useState('')

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
    const cleanedAccountName = accountName.trim()

    // Confirm passwords match
    if (password != confirmPassword) {
      setValidationError('Passwords do not match.')
      return
    }

    // Check if account name already exists
    if (currentAccountNames.includes(cleanedAccountName)) {
      setValidationError('Account name already exists.')
      return
    }

    axios.get('https://api.ipify.org/?format=json').then(response => {
      // Hash password
      const { hashedPassword } = hashPassword(password, true)

      // Create account
      axios
        .post('/api/createGameAccount', {
          accountName,
          password: hashedPassword,
          websiteAccountId: user?.id,
          userIp: response?.data?.ip,
        })
        .then(response => {
          if (typeof response?.data === 'number') {
            redirectTo(`/account/game-accounts/create/success?accountName=${accountName}`)
          }
        })
        .catch((error: { response: { data: string } }) => {
          setValidationError(error.response.data)
        })
    })
  }

  const fetchCurrentAccountNames = () => {
    axios
      .get(`/api/getCurrentGameAccountNames`)
      .then(response => {
        const allAccountNames = response?.data?.map((info: PlayerDataRow) => info.username)
        setCurrentAccountNames(allAccountNames)
      })
      .catch((error: string) => error)
  }

  if (!UserIsLoggedIn(user)) {
    return <NotLoggedIn />
  }

  if (currentAccountNames?.length < 1) {
    fetchCurrentAccountNames()
  }

  return (
    <ContentBlock>
      <Typography variant='h2'>Create Game Account</Typography>
      <BodyText variant='body' textAlign='left'>
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
        <FieldValidationError>{validationError}</FieldValidationError>
        <FormButton variant='contained' type='submit'>
          Submit
        </FormButton>
      </Form>
    </ContentBlock>
  )
}

export default CreateGameAccount
