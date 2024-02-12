import { BodyText } from '@atoms/BodyText'
import { ContentBlock } from '@atoms/ContentBlock'
import { Field } from '@atoms/Field'
import { FormButton } from '@atoms/FormButton/FormButton'
import { PageHeading } from '@atoms/PageHeading'
import useAuthentication from '@hooks/useAuthentication'
import { Spinner } from '@molecules/Spinner'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Form } from '@atoms/Form'
import { redirectTo } from '@helpers/window'
import { FieldValidationError } from '@atoms/FieldValidationError'
import { BannedText } from 'src/data/BannedText'
import axios from 'axios'

const ChangeUsernamePage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [newUsername, setNewUsername] = useState('')
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [formValidationError, setFormValidationError] = useState('')
  const user = useAuthentication(setIsLoading)

  const handleNewUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewUsername(event.target.value)
    setFormValidationError('')
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setButtonDisabled(true)

    // Check for same username
    if (newUsername === user.username) {
      setFormValidationError('The username you entered is already associated with your account.')
      setButtonDisabled(false)
      return
    }

    // Check for profanity
    if (BannedText.some(text => newUsername.toLowerCase().includes(text))) {
      setFormValidationError(
        'Your new username has been found to have offensive or misleading text. Please clean it up.',
      )
      setButtonDisabled(false)
      return
    }

    const updatedUser = user
    updatedUser.username = newUsername

    // Update iron user by logging out then in.
    axios.get('/api/ironLogout').then(() => {
      axios.post('/api/ironLogin', { ...updatedUser })
    })

    // Update username
    axios
      .post('/api/updateWebsiteUserUsername', {
        userId: user.id,
        newUsername,
      })
      .then(() => {
        redirectTo('/account/change-username/success')
      })
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <ContentBlock>
      <PageHeading>Change Username</PageHeading>
      <BodyText variant='body'>
        Enter your new username below. Remember that this only changes your website username, it does not affect your
        game accounts.
      </BodyText>
      <Form onSubmit={handleSubmit}>
        <Field
          required
          id='newUsername'
          label='New Username'
          variant='standard'
          onChange={handleNewUsernameChange}
          inputProps={{ maxLength: 25 }}
        />
        <FieldValidationError>{formValidationError}</FieldValidationError>
        <FormButton variant='contained' type='submit' disabled={buttonDisabled}>
          Submit
        </FormButton>
      </Form>
    </ContentBlock>
  )
}

export default ChangeUsernamePage
