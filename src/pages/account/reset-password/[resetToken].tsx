import { useRouter } from 'next/router'
import { ContentBlock } from '@atoms/ContentBlock'
import { Form } from '@atoms/Form'
import { Field } from '@atoms/Field'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { FieldValidationMessage } from '@atoms/FieldValidationMessage'
import { redirectTo } from '@helpers/window'
import { FormButton } from '@atoms/FormButton/FormButton'
import { hashPassword } from '@helpers/password'
import { PageHeading } from '@atoms/PageHeading'
import { sendApiRequest } from '@helpers/api/apiUtils'
import { User } from '@globalTypes/User'
import { Spinner } from '@molecules/Spinner'
import { BodyText } from '@atoms/BodyText'
import { InlineLink } from '@atoms/InlineLink'
import { renderHead } from '@helpers/renderUtils'

const ResetPassword = () => {
  const { query } = useRouter()
  const resetToken = query?.resetToken
  const [isLoading, setIsLoading] = useState(true)
  const [accountId, setAccountId] = useState('')
  const [lastModified, setLastModified] = useState<number>()
  const [tokenExpired, setTokenExpired] = useState(false)
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
    sendApiRequest('POST', '/api/resetWebsiteUserPassword', {
      userId: accountId,
      resetToken,
      dateModifiedMillis: lastModified,
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

  useEffect(() => {
    if (!resetToken || typeof resetToken !== 'string') {
      return
    }

    // Confirm token is valid and not expired.
    sendApiRequest('GET', '/api/checkResetToken', undefined, {
      resettoken: resetToken,
    }).then(response => {
      const user = response.data?.[0]
      if (user) {
        // There is a record returned. This means the token is valid and not expired.
        const lastModifiedMillis = new Date((user as User).dateModified).getTime()
        setLastModified(lastModifiedMillis)
        setAccountId(user.id)
      } else {
        // If nothing is returned from the query, the token has expired.
        setTokenExpired(true)
      }

      setIsLoading(false)
    })
  }, [resetToken])

  return (
    <>
      {renderHead('Reset Password')}
      {isLoading ? (
        <Spinner />
      ) : tokenExpired ? (
        <ContentBlock>
          <PageHeading>Token Expired</PageHeading>
          <BodyText variant='body'>
            Your token has expired. Please visit the{' '}
            <InlineLink href='/account/login/forgot-password'>Forgot Password</InlineLink> page and enter your email
            again. You need to open the link in the email within 10 minutes.
          </BodyText>
        </ContentBlock>
      ) : (
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
      )}
    </>
  )
}

export default ResetPassword
