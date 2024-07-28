import { BodyText } from '@atoms/BodyText'
import { ContentBlock } from '@atoms/ContentBlock'
import { PageHeading } from '@atoms/PageHeading'
import { handleForbiddenRedirect, sendApiRequest } from '@helpers/api/apiUtils'
import { renderHead } from '@helpers/renderUtils'
import useAuthentication from '@hooks/useAuthentication'
import { Spinner } from '@molecules/Spinner'
import axios, { AxiosError } from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import emailjs from '@emailjs/browser'
import { NullUser } from '@models/NullUser'
import { Field } from '@atoms/Field'
import { FieldValidationMessage } from '@atoms/FieldValidationMessage'
import { Form } from '@atoms/Form'
import { FormButton } from '@atoms/FormButton/FormButton'
import { User } from '@globalTypes/User'
import { UserExists } from '@helpers/users/users'
import usePasswordHashing from '@hooks/usePasswordHashing'

const ChangeEmailByIdPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState('')
  const [validationError, setValidationError] = useState('')
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [userValidated, setUserValidated] = useState(false)
  const [emailUpdated, setEmailUpdated] = useState(false)
  const { query } = useRouter()
  const accountId = query?.id
  const newEmail = query?.email
  const user = useAuthentication()
  const { passwordValid } = usePasswordHashing()

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setButtonDisabled(true)
    setIsLoading(true)

    sendApiRequest('GET', `/api/getUser?email=${encodeURIComponent(user.emailAddress)}`)
      .then(async response => {
        const result = response?.data

        // First thing would be to confirm the user exists.
        if (!UserExists(result) || result.id !== accountId) {
          setButtonDisabled(false)
          setValidationError('User could not be found.')
          return
        }

        // Next would be to make sure the password is right
        const handleHashingException = (error: Error) => {
          setButtonDisabled(false)
          setValidationError(`An error occurred. ${error.message}. Please notify the admin.`)
          return
        }

        const passwordIsCorrect = passwordValid(result, password, handleHashingException)

        if (!passwordIsCorrect) {
          setButtonDisabled(false)
          setValidationError('Password is incorrect.')
          return
        }

        // User exists and password is right - validate the user so we can change their email.
        setUserValidated(true)
      })
      .catch((error: string) => error)
  }

  useEffect(() => {
    if (
      !accountId ||
      !newEmail ||
      typeof newEmail !== 'string' ||
      user.emailAddress === NullUser.emailAddress ||
      !userValidated
    )
      return

    sendApiRequest('POST', '/api/updateWebsiteUserEmailAddress', {
      userId: accountId,
      newEmail,
    })
      .then(() => {
        // Send an email to the old address to let them know it changed
        emailjs
          .send('service_6xpikef', 'template_6rz807l', {
            recipient: user.emailAddress,
            newEmail,
          })
          .then(() => {
            // Update email, logout the user and log them back in.
            const updatedUser: User = {
              ...user,
              emailAddress: newEmail,
            }

            sendApiRequest('GET', '/api/ironLogout')
              .then(() => {
                setEmailUpdated(true)

                sendApiRequest('POST', '/api/ironLogin', updatedUser)
                  .then(response => {
                    if (response?.status !== 200) {
                      setButtonDisabled(false)
                      setValidationError('An error occurred logging you in.')
                    } else {
                      // We will now log IPs for website account logins, for security.
                      axios.get('https://api.ipify.org/?format=json').then(response => {
                        // Update the user's session, ip, and lastLogin in the database.
                        sendApiRequest('POST', '/api/updateWebsiteUserSession', {
                          userId: updatedUser.id,
                          userIp: response?.data?.ip,
                        })
                          .then(() => {
                            setIsLoading(false)
                          })
                          .catch((error: { response: { data: string } }) => {
                            setButtonDisabled(false)
                            setValidationError(`Couldn't update user session: ${error?.response?.data}`)
                          })
                      })
                    }
                  })
                  .catch((error: { response: { data: string } }) => {
                    setButtonDisabled(false)
                    setValidationError(`An error occurred logging you in: ${error?.response?.data}`)
                  })
              })
              .catch((error: string) => {
                console.log('An error occurred on logout: ', error)
              })
          })
          .catch((error: string) => {
            console.log('An error occurred sending the confirm email to the old address: ', error)
          })
      })
      .catch((error: AxiosError<string>) => {
        handleForbiddenRedirect(error)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountId, newEmail, user.emailAddress, userValidated])

  if (isLoading) {
    return (
      <>
        {renderHead('Change Email Address')}
        <Spinner />
      </>
    )
  }

  return !emailUpdated ? (
    <>
      {renderHead('Change Email Address')}
      <ContentBlock>
        <PageHeading>Change Email Address</PageHeading>
        <BodyText variant='body' bodyTextAlign='center'>
          Please enter your password to continue.
        </BodyText>
        <Form onSubmit={handleSubmit}>
          <Field
            required
            id='password'
            label='Password'
            type='password'
            variant='standard'
            onChange={handlePasswordChange}
          />
          <FieldValidationMessage>{validationError}</FieldValidationMessage>
          <FormButton variant='contained' type='submit' disabled={buttonDisabled}>
            Submit
          </FormButton>
        </Form>
      </ContentBlock>
    </>
  ) : (
    <ContentBlock>
      <PageHeading>Update Complete</PageHeading>
      <BodyText variant='body' bodyTextAlign='center'>
        Your email has been updated. You can go back to your <Link href='/account'>account</Link> page.
      </BodyText>
    </ContentBlock>
  )
}

export default ChangeEmailByIdPage
