import { useRouter } from 'next/router'
import { ContentBlock } from '@atoms/ContentBlock'
import { Form } from '@atoms/Form'
import { Field } from '@atoms/Field'
import { ChangeEvent, FormEvent, useState } from 'react'
import { FieldValidationMessage } from '@atoms/FieldValidationMessage'
import { redirectTo } from '@helpers/window'
import { FormButton } from '@atoms/FormButton/FormButton'
import { hashPassword } from '@helpers/password'
import { PageHeading } from '@atoms/PageHeading'
import { sendApiRequest } from '@helpers/api/apiUtils'

const ResetPassword = () => {
  const { query } = useRouter()
  const accountId = query?.id
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [validationError, setValidationError] = useState('')

  const handleNewPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value)
    setValidationError('')
  }

  const handleConfirmNewPasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setConfirmNewPassword(event.target.value)
    setValidationError('')
  }

  const handleRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Make sure passwords match.
    if (newPassword !== confirmNewPassword) {
      setValidationError('Passwords must match.')
      return
    }

    // Hash new password
    const { hashedPassword, passwordSalt } = hashPassword(newPassword)

    // Update the user's password
    sendApiRequest('POST', '/api/updateWebsiteUserPassword', {
      userId: accountId,
      newPassword: hashedPassword,
      newPasswordSalt: passwordSalt,
    }).then(response => {
      if (typeof response?.data === 'number') {
        // Reset was successful - redirect to success page
        redirectTo('/account/reset-password/success')
      } else {
        const errorMessage = `Non-number response type in reset-password/id: ${response?.data}`
        console.log(errorMessage)
        setValidationError(`Something went wrong. Please try again later. Error: ${errorMessage}`)
      }
    })
  }

  return (
    <ContentBlock>
      <PageHeading>Reset Your Password</PageHeading>
      <Form onSubmit={handleRequest}>
        <Field
          required
          id='newPassword'
          label='New Password'
          variant='standard'
          onChange={handleNewPasswordChange}
          type='password'
        />
        <Field
          required
          id='confirmNewPassword'
          label='Confirm New Password'
          variant='standard'
          onChange={handleConfirmNewPasswordChange}
          type='password'
        />
        <FieldValidationMessage>{validationError}</FieldValidationMessage>
        <FormButton variant='contained' type='submit'>
          Submit
        </FormButton>
      </Form>
    </ContentBlock>
  )
}

export default ResetPassword
