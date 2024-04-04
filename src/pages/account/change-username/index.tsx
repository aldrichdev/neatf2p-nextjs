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
import { FieldValidationMessage } from '@atoms/FieldValidationMessage'
import { BannedText } from 'src/data/BannedText'
import { handleForbiddenRedirect, sendApiRequest } from '@helpers/api/apiUtils'
import { UserIsLoggedIn } from '@helpers/users/users'
import { NotLoggedIn } from '@molecules/NotLoggedIn'
import Head from 'next/head'
import { SharedBrowserTitle } from 'src/constants'

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

    // Update iron user by logging out then in, and updating session info.
    sendApiRequest('GET', '/api/ironLogout').then(() => {
      sendApiRequest('POST', '/api/ironLogin', { ...updatedUser }).then(() => {
        sendApiRequest('POST', '/api/updateWebsiteUserSession', {
          userId: user.id,
        })
      })
    })

    // Update username
    sendApiRequest('POST', '/api/updateWebsiteUserUsername', {
      userId: user.id,
      newUsername,
    })
      .then(() => {
        redirectTo('/account/change-username/success')
      })
      .catch((error: string) => {
        handleForbiddenRedirect(error)
      })
  }

  if (isLoading) {
    return <Spinner />
  }

  if (!UserIsLoggedIn(user)) {
    return <NotLoggedIn />
  }

  return (
    <>
      <Head>
        <title>Change Username | {SharedBrowserTitle}</title>
      </Head>
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
          <FieldValidationMessage>{formValidationError}</FieldValidationMessage>
          <FormButton variant='contained' type='submit' disabled={buttonDisabled}>
            Submit
          </FormButton>
        </Form>
      </ContentBlock>
    </>
  )
}

export default ChangeUsernamePage
