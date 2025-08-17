import { BodyText } from '@atoms/BodyText'
import { ContentBlock } from '@atoms/ContentBlock'
import { Field } from '@atoms/Field'
import { FormButton } from '@atoms/FormButton/FormButton'
import { PageHeading } from '@atoms/PageHeading'
import { ChangeEvent, FormEvent, useState } from 'react'
import { Form } from '@atoms/Form'
import { redirectTo } from '@helpers/window'
import { FieldValidationMessage } from '@atoms/FieldValidationMessage'
import { hashPassword } from '@helpers/password'
import { handleForbiddenRedirect, sendApiRequest } from '@helpers/api/apiUtils'
import { renderHead } from '@helpers/renderUtils'
import { AxiosError } from 'axios'
import { User } from '@globalTypes/User'
import { NullUser } from '@models/NullUser'
import { sessionOptions } from '@models/session'
import { getIronSession } from 'iron-session'
import { GetServerSideProps } from 'next'

type ChangePasswordPageProps = {
  user: User
}

const ChangePasswordPage = ({ user }: ChangePasswordPageProps) => {
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [formValidationError, setFormValidationError] = useState('')

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
      .catch((error: AxiosError<string>) => {
        handleForbiddenRedirect(error)
      })
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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getIronSession(req, res, sessionOptions)
  const user: User = session?.user || NullUser

  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  }
}
