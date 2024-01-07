import { useRouter } from 'next/router'
import { Typography } from '@mui/material'
import { ContentBlock } from '@atoms/ContentBlock'
import { Form } from '@atoms/Form'
import { Field } from '@atoms/Field'
import { ChangeEvent, FormEvent, useState } from 'react'
import bcrypt from 'bcryptjs'
import axios from 'axios'
import { FieldValidationError } from '@atoms/FieldValidationError'
import { redirectTo } from '@helpers/window'
import { FormButton } from '@atoms/FormButton/FormButton'
import { hashPassword } from '@helpers/password'

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
    console.log('passwordSalt', passwordSalt)

    // Update the user's password
    axios
      .post('/api/updateWebsiteUserPassword', {
        userId: accountId,
        newPassword: hashedPassword,
        newPasswordSalt: passwordSalt,
      })
      .then(response => {
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
      <Typography variant='h2'>Reset Your Password</Typography>
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
        <FieldValidationError>{validationError}</FieldValidationError>
        <FormButton variant='contained' type='submit'>
          Submit
        </FormButton>
      </Form>
    </ContentBlock>
  )
}

export default ResetPassword
