import { BodyText } from '@atoms/BodyText'
import { ContentBlock } from '@atoms/ContentBlock'
import { Field } from '@atoms/Field'
import { FormButton } from '@atoms/FormButton/FormButton'
import { PageHeading } from '@atoms/PageHeading'
import useAuthentication from '@hooks/useAuthentication'
import { Spinner } from '@molecules/Spinner'
import { ChangeEvent, FormEvent, useState } from 'react'
import emailjs from '@emailjs/browser'
import { Form } from '@atoms/Form'
import { redirectTo } from '@helpers/window'
import { FieldValidationMessage } from '@atoms/FieldValidationMessage'

const ChangeEmailPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [newEmail, setNewEmail] = useState('')
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [formValidationError, setFormValidationError] = useState('')
  const user = useAuthentication(setIsLoading)

  const handleNewEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewEmail(event.target.value)
    setFormValidationError('')
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setButtonDisabled(true)

    // Must be a new address
    if (newEmail === user.emailAddress) {
      setFormValidationError('The email you entered is already associated with your account.')
      setButtonDisabled(false)
      return
    }

    // Send email verification
    emailjs
      .send('service_6xpikef', 'template_6xawv5v', {
        recipient: newEmail,
        websiteAccountId: user.id,
      })
      .then(() => {
        redirectTo(`/account/change-email/success?email=${newEmail}`)
      })
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <ContentBlock>
      <PageHeading>Change Email Address</PageHeading>
      <BodyText variant='body'>
        Enter your new email address below. We will send an email to the new address to confirm you own that account.
        Within the email there will be a link to complete the process.
      </BodyText>
      <Form onSubmit={handleSubmit}>
        <Field
          required
          id='newEmail'
          label='New Email'
          type='email'
          variant='standard'
          onChange={handleNewEmailChange}
        />
        <FieldValidationMessage>{formValidationError}</FieldValidationMessage>
        <FormButton variant='contained' type='submit' disabled={buttonDisabled}>
          Submit
        </FormButton>
      </Form>
    </ContentBlock>
  )
}

export default ChangeEmailPage
