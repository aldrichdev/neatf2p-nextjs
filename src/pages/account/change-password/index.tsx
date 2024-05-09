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
import { hashPassword } from '@helpers/password'
import { handleForbiddenRedirect, sendApiRequest } from '@helpers/api/apiUtils'
import { renderHead } from '@helpers/renderUtils'

const ChangePasswordPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [formValidationError, setFormValidationError] = useState('')
  const user = useAuthentication(setIsLoading)

  const handleNewPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value)
    setFormValidationError('')
  }

  const handleConfirmNewPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmNewPassword(event.target.value)
    setFormValidationError('')
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setButtonDisabled(true)

    // Make sure passwords match
    if (newPassword !== confirmNewPassword) {
      setFormValidationError('Passwords must match.')
      setButtonDisabled(false)
      return
    }

    // Hash new password
    const { hashedPassword, passwordSalt } = hashPassword(newPassword)

    // Update the user's password
    sendApiRequest('POST', '/api/updateWebsiteUserPassword', {
      userId: user.id,
      newPassword: hashedPassword,
      newPasswordSalt: passwordSalt,
    })
      .then(response => {
        if (typeof response?.data === 'number') {
          // Reset was successful - redirect to success page
          redirectTo('/account/change-password/success')
        } else {
          const errorMessage = `Non-number response type in change-password: ${response?.data}`
          console.log(errorMessage)
          setFormValidationError(`Something went wrong. Please try again later. Error: ${errorMessage}`)
        }
      })
      .catch((error: string) => {
        handleForbiddenRedirect(error)
      })
  }

  if (isLoading) {
    return (
      <>
        {renderHead('Change Password')}
        <Spinner />
      </>
    )
  }

  return (
    <>
      {renderHead('Change Password')}
      <ContentBlock>
        <PageHeading>Change Password</PageHeading>
        <BodyText variant='body'>Please enter your new password below.</BodyText>
        <Form onSubmit={handleSubmit}>
          <Field
            required
            id='newPassword'
            label='New Password'
            type='password'
            variant='standard'
            onChange={handleNewPasswordChange}
          />
          <Field
            required
            id='confirmNewPassword'
            label='Confirm New Password'
            type='password'
            variant='standard'
            onChange={handleConfirmNewPasswordChange}
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

export default ChangePasswordPage
